"use client";

import { Loader2, Volume2 } from "lucide-react";
import { GlowActionButton } from "@/components/motion-primitives/glow-action-button";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { SpeechProgressVisualizer } from "@/components/tools/speech-progress-visualizer";
import { cn } from "@/lib/utils";

type ListenAudioButtonProps = {
  text: string;
  className?: string;
  compact?: boolean;
};

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
      <GlowActionButton
        onClick={handleClick}
        disabled={!text.trim()}
        aria-pressed={busy}
        contentClassName={cn(
          compact && "px-2.5",
          busy && "text-orange-100"
        )}
        className="w-fit"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
        {!compact && (loading ? "Preparing..." : busy ? "Playing..." : "Listen Audio")}
      </GlowActionButton>

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
