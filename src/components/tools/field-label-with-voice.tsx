"use client";

import { labelClassName } from "@/lib/tool-form-config";
import { VoiceInputButton } from "@/components/tools/voice-input-button";
import { cn } from "@/lib/utils";

type FieldLabelWithVoiceProps = {
  htmlFor: string;
  children: React.ReactNode;
  onVoiceTranscript: (text: string) => void;
  voiceDisabled?: boolean;
  className?: string;
};

export function FieldLabelWithVoice({
  htmlFor,
  children,
  onVoiceTranscript,
  voiceDisabled = false,
  className,
}: FieldLabelWithVoiceProps) {
  return (
    <div className={cn("mb-2 flex items-start justify-between gap-3", className)}>
      <label htmlFor={htmlFor} className={cn(labelClassName, "mb-0")}>
        {children}
      </label>
      <VoiceInputButton onTranscript={onVoiceTranscript} disabled={voiceDisabled} />
    </div>
  );
}
