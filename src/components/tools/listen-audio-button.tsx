"use client";

import { Loader2, Volume2, VolumeX } from "lucide-react";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { cn } from "@/lib/utils";

type ListenAudioButtonProps = {
  text: string;
  className?: string;
  compact?: boolean;
};

const buttonClassName =
  "inline-flex items-center gap-1.5 rounded-lg border border-sky-400/20 bg-navy-950/40 px-3 py-1.5 text-xs font-medium text-sky-200 transition-colors hover:border-sky-400/40 hover:text-white sm:text-sm";

export function ListenAudioButton({ text, className, compact = false }: ListenAudioButtonProps) {
  const { speak, stop, speaking, loading, error } = useTextToSpeech();

  function handleClick() {
    if (speaking || loading) {
      stop();
      return;
    }
    void speak(text);
  }

  const busy = speaking || loading;

  return (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      <button
        type="button"
        onClick={handleClick}
        disabled={!text.trim()}
        aria-pressed={busy}
        aria-label={busy ? "Stop audio" : "Listen in English, Hindi, or Punjabi"}
        title={busy ? "Stop audio" : "Listen Audio (English, Hindi, Punjabi)"}
        className={cn(
          buttonClassName,
          busy && "border-orange-400/40 bg-orange-500/10 text-orange-200",
          compact && "px-2.5",
          !text.trim() && "cursor-not-allowed opacity-50"
        )}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : busy ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
        {!compact &&
          (loading ? "Preparing..." : busy ? "Stop Audio" : "Listen Audio")}
      </button>
      {error && <p className="max-w-xs text-xs text-red-300">{error}</p>}
    </div>
  );
}
