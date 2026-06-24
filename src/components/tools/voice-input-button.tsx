"use client";

import { Mic, MicOff } from "lucide-react";
import { useVoiceInput } from "@/hooks/use-voice-input";
import { cn } from "@/lib/utils";

type VoiceInputButtonProps = {
  onTranscript: (text: string) => void;
  disabled?: boolean;
  className?: string;
};

export function VoiceInputButton({ onTranscript, disabled = false, className }: VoiceInputButtonProps) {
  const { listening, supported, voiceError, startListening, stopListening, clearVoiceError } =
    useVoiceInput();

  if (!supported) return null;

  function handleClick() {
    if (disabled) return;
    clearVoiceError();
    if (listening) {
      stopListening();
      return;
    }
    startListening(onTranscript);
  }

  return (
    <div className={cn("flex flex-col items-end gap-1", className)}>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        aria-pressed={listening}
        aria-label={listening ? "Stop voice input" : "Start voice input"}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
          listening
            ? "border-orange-400/50 bg-orange-500/20 text-orange-300"
            : "border-sky-400/25 bg-sky-400/10 text-sky-200 hover:border-sky-400/40 hover:text-white",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {listening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
        {listening ? "Listening..." : "Voice"}
      </button>
      {voiceError && <p className="max-w-[12rem] text-right text-xs text-red-400">{voiceError}</p>}
    </div>
  );
}
