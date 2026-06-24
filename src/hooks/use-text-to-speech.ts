"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { stripMarkdownForSpeech } from "@/lib/plain-text";
import { BROWSER_TTS_CHUNK_SIZE, chunkTextBySentences } from "@/lib/speech-chunks";
import { pickVoiceForLang, splitTextForSpeech, type SpeechSegment } from "@/lib/speech-segments";
import { normalizeTextForSpeech } from "@/lib/speech-text";

type BrowserQueueItem = SpeechSegment & { id: number };

type StreamedChunk = {
  index: number;
  total: number;
  audio: string;
  mimeType: string;
};

function base64ToBlob(base64: string, mimeType: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
}

export function useTextToSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const browserQueueRef = useRef<BrowserQueueItem[]>([]);
  const browserIndexRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlsRef = useRef<Map<number, string>>(new Map());
  const playIndexRef = useRef(0);
  const totalChunksRef = useRef(0);
  const isPlayingRef = useRef(false);
  const fetchAbortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const browserSupported =
    typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

  useEffect(() => {
    if (!browserSupported) return;

    function loadVoices() {
      setVoices(window.speechSynthesis.getVoices());
    }

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, [browserSupported]);

  const cleanupAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }
    for (const url of audioUrlsRef.current.values()) {
      URL.revokeObjectURL(url);
    }
    audioUrlsRef.current = new Map();
    playIndexRef.current = 0;
    totalChunksRef.current = 0;
    isPlayingRef.current = false;
  }, []);

  const stop = useCallback(() => {
    requestIdRef.current += 1;
    fetchAbortRef.current?.abort();
    fetchAbortRef.current = null;
    setLoading(false);
    setSpeaking(false);
    setError(null);
    browserQueueRef.current = [];
    browserIndexRef.current = 0;
    cleanupAudio();
    if (browserSupported) {
      window.speechSynthesis.cancel();
    }
  }, [browserSupported, cleanupAudio]);

  const buildBrowserQueue = useCallback((text: string): BrowserQueueItem[] => {
    const cleaned = stripMarkdownForSpeech(text);
    const langSegments = splitTextForSpeech(cleaned);
    const segments =
      langSegments.length > 0 ? langSegments : [{ text: cleaned, lang: "en-IN" as const }];

    const queue: BrowserQueueItem[] = [];
    let id = 0;

    for (const segment of segments) {
      for (const piece of chunkTextBySentences(segment.text, BROWSER_TTS_CHUNK_SIZE)) {
        const spokenText = normalizeTextForSpeech(piece, segment.lang);
        if (spokenText) {
          queue.push({ text: spokenText, lang: segment.lang, id: id++ });
        }
      }
    }

    return queue;
  }, []);

  const speakBrowserSegment = useCallback(
    (item: BrowserQueueItem) => {
      const utterance = new SpeechSynthesisUtterance(item.text);
      utterance.lang = item.lang;
      utterance.rate = 1;

      const availableVoices = window.speechSynthesis.getVoices();
      const voice = pickVoiceForLang(
        item.lang,
        availableVoices.length > 0 ? availableVoices : voices
      );
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        browserIndexRef.current += 1;
        const next = browserQueueRef.current[browserIndexRef.current];
        if (next) {
          speakBrowserSegment(next);
          return;
        }
        setSpeaking(false);
      };

      utterance.onerror = () => {
        browserIndexRef.current += 1;
        const next = browserQueueRef.current[browserIndexRef.current];
        if (next) {
          speakBrowserSegment(next);
          return;
        }
        setSpeaking(false);
        setError("Browser speech stopped early. Add SARVAM_API_KEY for better Hindi/Punjabi audio.");
      };

      window.speechSynthesis.speak(utterance);
    },
    [voices]
  );

  const speakWithBrowser = useCallback(
    (text: string) => {
      if (!browserSupported) {
        setError("Speech is not supported in this browser.");
        return;
      }

      const queue = buildBrowserQueue(text);
      if (!queue.length) return;

      browserQueueRef.current = queue;
      browserIndexRef.current = 0;
      setSpeaking(true);
      setError(null);
      speakBrowserSegment(queue[0]);
    },
    [browserSupported, buildBrowserQueue, speakBrowserSegment]
  );

  const playNextServerChunk = useCallback(
    (requestId: number) => {
      if (requestId !== requestIdRef.current) return;

      const index = playIndexRef.current;
      const url = audioUrlsRef.current.get(index);
      if (!url) return;

      isPlayingRef.current = true;
      setLoading(false);
      setSpeaking(true);

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        if (requestId !== requestIdRef.current) return;
        isPlayingRef.current = false;
        playIndexRef.current += 1;

        if (playIndexRef.current < totalChunksRef.current) {
          playNextServerChunk(requestId);
          return;
        }

        setSpeaking(false);
        cleanupAudio();
      };

      audio.onerror = () => {
        if (requestId !== requestIdRef.current) return;
        isPlayingRef.current = false;
        playIndexRef.current += 1;
        playNextServerChunk(requestId);
      };

      void audio.play().catch(() => {
        if (requestId !== requestIdRef.current) return;
        isPlayingRef.current = false;
        setSpeaking(false);
        setLoading(false);
        setError("Could not start audio playback.");
        cleanupAudio();
      });
    },
    [cleanupAudio]
  );

  const onServerChunkReady = useCallback(
    (requestId: number) => {
      if (requestId !== requestIdRef.current || isPlayingRef.current) return;
      if (!audioUrlsRef.current.has(playIndexRef.current)) return;
      playNextServerChunk(requestId);
    },
    [playNextServerChunk]
  );

  const speakWithServer = useCallback(
    async (text: string, requestId: number) => {
      const abortController = new AbortController();
      fetchAbortRef.current = abortController;

      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: abortController.signal,
      });

      if (response.status === 503) {
        speakWithBrowser(text);
        return;
      }

      if (!response.ok) {
        let message = "Could not generate speech audio.";
        try {
          const payload = (await response.json()) as { error?: string };
          if (payload.error) message = payload.error;
        } catch {
          // ignore parse errors
        }
        throw new Error(message);
      }

      if (!response.body) {
        throw new Error("No audio stream received.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (requestId !== requestIdRef.current) return;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;
          const chunk = JSON.parse(line) as StreamedChunk;
          totalChunksRef.current = chunk.total;
          audioUrlsRef.current.set(
            chunk.index,
            URL.createObjectURL(base64ToBlob(chunk.audio, chunk.mimeType || "audio/mpeg"))
          );
          onServerChunkReady(requestId);
        }
      }

      if (requestId !== requestIdRef.current) return;

      if (totalChunksRef.current === 0) {
        throw new Error("No audio was generated.");
      }

      if (!isPlayingRef.current && audioUrlsRef.current.has(0)) {
        onServerChunkReady(requestId);
      }
    },
    [onServerChunkReady, speakWithBrowser]
  );

  const speak = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      stop();
      const requestId = requestIdRef.current;
      setLoading(true);
      setError(null);

      try {
        await speakWithServer(text, requestId);
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        if (err instanceof DOMException && err.name === "AbortError") return;
        setLoading(false);
        if (browserSupported) {
          speakWithBrowser(text);
          return;
        }
        setError(err instanceof Error ? err.message : "Could not read text aloud.");
      }
    },
    [browserSupported, speakWithBrowser, speakWithServer, stop]
  );

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    speak,
    stop,
    speaking,
    loading,
    error,
    supported: true,
  };
}
