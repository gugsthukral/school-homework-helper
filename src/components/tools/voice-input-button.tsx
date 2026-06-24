"use client";

import { Mic, MicOff } from "lucide-react";
import { useVoiceInput } from "@/hooks/use-voice-input";
import { InputActionIconButton } from "@/components/tools/input-action-icon-button";
import { cn } from "@/lib/utils";

type VoiceInputButtonProps = {
  onTranscript: (text: string) => void;
  disabled?: boolean;
  compact?: boolean;
  className?: string;
};

export function VoiceInputButton({
  onTranscript,
  disabled = false,
  compact = false,
  className,
}: VoiceInputButtonProps) {
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

  const button = (
    <InputActionIconButton
      icon={listening ? MicOff : Mic}
      label={listening ? "Stop voice input" : "Voice input"}
      onClick={handleClick}
      disabled={disabled}
      active={listening}
      size={compact ? "sm" : "default"}
    />
  );

  if (compact) {
    return <div className={className}>{button}</div>;
  }

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      {button}
      {voiceError && (
        <p className="max-w-[9rem] text-center text-[10px] leading-tight text-red-400">{voiceError}</p>
      )}
    </div>
  );
}
