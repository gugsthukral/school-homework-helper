"use client";

import { Loader2, Volume2 } from "lucide-react";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { SpeechProgressVisualizer } from "@/components/tools/speech-progress-visualizer";
import { cn } from "@/lib/utils";

type ListenAudioButtonProps = {
  text: string;
  className?: string;
  compact?: boolean;
};

const buttonClassName =
  "inline-flex items-center gap-1.5 rounded-lg border border-sky-400/20 bg-navy-950/40 px-3 py-1.5 text-xs font-medium text-sky-200 transition-colors hover:border-sky-400/40 hover:text-white sm:text-sm";

/** Standalone listen control — prefer ResultExportActions for AI result cards. */
export function ListenAudioButton({ text, className, compact = false }: ListenAudioButtonProps) {
  const {
    speak,
    stop,
    speaking,
    loading,
    error,
    progress,
    currentChunk,
    totalChunks,
    activeAudio,
  } = useTextToSpeech();

  const busy = speaking || loading;

  function handleClick() {
    if (busy) {
      stop();
      return;
    }
    void speak(text);
  }

  return (
    <div className={cn("flex w-full min-w-0 flex-col gap-2", className)}>
      <button
        type="button"
        onClick={handleClick}
        disabled={!text.trim()}
        aria-pressed={busy}
        className={cn(
          buttonClassName,
          busy && "border-orange-400/40 bg-orange-500/10 text-orange-200",
          compact && "px-2.5",
          !text.trim() && "cursor-not-allowed opacity-50",
          "w-fit"
        )}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
        {!compact && (loading ? "Preparing..." : busy ? "Playing..." : "Listen Audio")}
      </button>

      <SpeechProgressVisualizer
        active={speaking}
        loading={loading}
        progress={progress}
        currentChunk={currentChunk}
        totalChunks={totalChunks}
        audioElement={activeAudio}
        onStop={stop}
      />

      {error && <p className="max-w-xs text-xs text-red-300">{error}</p>}
    </div>
  );
}
