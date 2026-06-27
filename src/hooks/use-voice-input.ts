"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { detectRecognitionLang } from "@/lib/indian-languages";

function getSpeechRecognition() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

function getVoiceErrorMessage(code: string): string | null {
  switch (code) {
    case "aborted":
      return null;
    case "not-allowed":
    case "service-not-allowed":
      return "Microphone access was denied. Allow mic permission in your browser settings.";
    case "audio-capture":
      return "Microphone is busy. Close other apps using the mic and try again.";
    case "no-speech":
      return null;
    case "network":
      return "Voice input needs internet. Check your connection and try again.";
    default:
      return "Could not capture voice. Try again or type instead.";
  }
}

function releaseRecognition(recognition: SpeechRecognition | null) {
  if (!recognition) return;
  recognition.onstart = null;
  recognition.onend = null;
  recognition.onerror = null;
  recognition.onresult = null;
  try {
    recognition.stop();
  } catch {
    try {
      recognition.abort();
    } catch {
      // instance may already be stopped
    }
  }
}

export function useVoiceInput() {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const userStoppedRef = useRef(false);
  const onTranscriptRef = useRef<((text: string) => void) | null>(null);
  const contextTextRef = useRef("");
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voiceError, setVoiceError] = useState("");

  useEffect(() => {
    setSupported(Boolean(getSpeechRecognition()));
    return () => {
      userStoppedRef.current = true;
      releaseRecognition(recognitionRef.current);
      recognitionRef.current = null;
    };
  }, []);

  const attachRecognitionHandlers = useCallback((recognition: SpeechRecognition) => {
    recognition.onstart = () => {
      setVoiceError("");
      setListening(true);
    };

    recognition.onend = () => {
      if (userStoppedRef.current) {
        setListening(false);
        recognitionRef.current = null;
        return;
      }

      window.setTimeout(() => {
        if (userStoppedRef.current || recognitionRef.current !== recognition) {
          return;
        }

        try {
          recognition.start();
        } catch {
          setListening(false);
          recognitionRef.current = null;
          setVoiceError("Voice input paused. Tap the mic to continue.");
        }
      }, 100);
    };

    recognition.onerror = (event) => {
      if (userStoppedRef.current) return;
      if (event.error === "aborted" || event.error === "no-speech") return;

      userStoppedRef.current = true;
      setListening(false);
      recognitionRef.current = null;

      const message = getVoiceErrorMessage(event.error);
      if (message) setVoiceError(message);
    };

    recognition.onresult = (event) => {
      const onTranscript = onTranscriptRef.current;
      if (!onTranscript) return;

      let text = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          text += result[0]?.transcript ?? "";
        }
      }

      const trimmed = text.trim();
      if (trimmed) onTranscript(trimmed);
    };
  }, []);

  const startRecognitionSession = useCallback(() => {
    const SpeechRecognitionCtor = getSpeechRecognition();
    if (!SpeechRecognitionCtor) return false;

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = detectRecognitionLang(contextTextRef.current);
    recognition.interimResults = false;
    recognition.continuous = true;

    attachRecognitionHandlers(recognition);
    recognitionRef.current = recognition;

    try {
      recognition.start();
      return true;
    } catch {
      recognitionRef.current = null;
      return false;
    }
  }, [attachRecognitionHandlers]);

  const startListening = useCallback(
    (onTranscript: (text: string) => void, contextText = "") => {
      const SpeechRecognitionCtor = getSpeechRecognition();
      if (!SpeechRecognitionCtor) {
        setVoiceError("Voice input is not supported in this browser. Try Chrome or Edge.");
        return;
      }

      releaseRecognition(recognitionRef.current);
      recognitionRef.current = null;
      userStoppedRef.current = false;
      onTranscriptRef.current = onTranscript;
      contextTextRef.current = contextText;

      if (!startRecognitionSession()) {
        setListening(false);
        setVoiceError("Could not start voice input. Tap the mic again.");
      }
    },
    [startRecognitionSession]
  );

  const stopListening = useCallback(() => {
    userStoppedRef.current = true;
    onTranscriptRef.current = null;
    const recognition = recognitionRef.current;
    if (recognition) {
      try {
        recognition.stop();
      } catch {
        releaseRecognition(recognition);
      }
    }
    setListening(false);
    recognitionRef.current = null;
  }, []);

  return {
    listening,
    supported,
    voiceError,
    startListening,
    stopListening,
    clearVoiceError: () => setVoiceError(""),
  };
}
