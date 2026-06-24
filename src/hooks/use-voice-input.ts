"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
      return "No speech detected. Tap the mic and speak again.";
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
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voiceError, setVoiceError] = useState("");

  useEffect(() => {
    setSupported(Boolean(getSpeechRecognition()));
    return () => {
      releaseRecognition(recognitionRef.current);
      recognitionRef.current = null;
    };
  }, []);

  const startListening = useCallback((onTranscript: (text: string) => void) => {
    const SpeechRecognitionCtor = getSpeechRecognition();
    if (!SpeechRecognitionCtor) {
      setVoiceError("Voice input is not supported in this browser. Try Chrome or Edge.");
      return;
    }

    releaseRecognition(recognitionRef.current);
    recognitionRef.current = null;
    userStoppedRef.current = false;

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setVoiceError("");
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognition.onerror = (event) => {
      setListening(false);
      recognitionRef.current = null;
      if (userStoppedRef.current) return;

      const message = getVoiceErrorMessage(event.error);
      if (message) setVoiceError(message);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();
      if (transcript) onTranscript(transcript);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      setListening(false);
      recognitionRef.current = null;
      setVoiceError("Could not start voice input. Tap the mic again.");
    }
  }, []);

  const stopListening = useCallback(() => {
    userStoppedRef.current = true;
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
