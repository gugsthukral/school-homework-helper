"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function getSpeechRecognition() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export function useVoiceInput() {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micCleanupRef = useRef<(() => void) | null>(null);
  const [listening, setListening] = useState(false);
  const [micReady, setMicReady] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voiceError, setVoiceError] = useState("");

  const stopMicMonitor = useCallback(() => {
    micCleanupRef.current?.();
    micCleanupRef.current = null;
    analyserRef.current = null;
    setMicReady(false);
  }, []);

  const startMicMonitor = useCallback(async () => {
    stopMicMonitor();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new AudioContext();
      if (context.state === "suspended") {
        await context.resume();
      }
      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.72;
      source.connect(analyser);
      analyserRef.current = analyser;
      setMicReady(true);

      micCleanupRef.current = () => {
        stream.getTracks().forEach((track) => track.stop());
        source.disconnect();
        analyser.disconnect();
        void context.close();
      };
    } catch {
      // Speech recognition may still work; visualizer falls back to animation.
    }
  }, [stopMicMonitor]);

  useEffect(() => {
    setSupported(Boolean(getSpeechRecognition()));
    return () => {
      recognitionRef.current?.abort();
      stopMicMonitor();
    };
  }, [stopMicMonitor]);

  const startListening = useCallback(
    (onTranscript: (text: string) => void) => {
      const SpeechRecognitionCtor = getSpeechRecognition();
      if (!SpeechRecognitionCtor) {
        setVoiceError("Voice input is not supported in this browser. Try Chrome or Edge.");
        return;
      }

      recognitionRef.current?.abort();

      const recognition = new SpeechRecognitionCtor();
      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => {
        setVoiceError("");
        setListening(true);
        void startMicMonitor();
      };

      recognition.onend = () => {
        setListening(false);
        stopMicMonitor();
      };

      recognition.onerror = () => {
        setListening(false);
        stopMicMonitor();
        setVoiceError("Could not capture voice. Check microphone permission and try again.");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript?.trim();
        if (transcript) onTranscript(transcript);
      };

      recognitionRef.current = recognition;
      recognition.start();
    },
    [startMicMonitor, stopMicMonitor]
  );

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
    stopMicMonitor();
  }, [stopMicMonitor]);

  return {
    listening,
    supported,
    voiceError,
    analyserRef,
    micReady,
    startListening,
    stopListening,
    clearVoiceError: () => setVoiceError(""),
  };
}
