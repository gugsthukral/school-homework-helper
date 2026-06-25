"use client";

import { useState } from "react";
import { Download, Loader2, Printer, Volume2 } from "lucide-react";
import { GlowActionButton } from "@/components/motion-primitives/glow-action-button";
import { downloadTextFile, printResult } from "@/lib/export-result";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { SpeechProgressVisualizer } from "@/components/tools/speech-progress-visualizer";
import { ResultShareIcons } from "@/components/tools/result-share-icons";
import { cn } from "@/lib/utils";

type ResultExportActionsProps = {
  content: string;
  fileName: string;
  title: string;
  subtitle?: string;
  sharePath?: string;
  showExport?: boolean;
  showShare?: boolean;
  className?: string;
};

export function ResultExportActions({
  content,
  fileName,
  title,
  subtitle,
  sharePath,
  showExport = true,
  showShare = true,
  className,
}: ResultExportActionsProps) {
  const [printError, setPrintError] = useState("");
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

  const audioBusy = speaking || loading;

  function handleListen() {
    if (audioBusy) {
      stop();
      return;
    }
    void speak(content);
  }

  function handlePrint() {
    setPrintError("");
    const ok = printResult({ title, content, subtitle });
    if (!ok) {
      setPrintError("Could not open print dialog. Please try again.");
    }
  }

  function handleDownload() {
    const header = subtitle ? `${title}\n${subtitle}\n${"=".repeat(40)}\n\n` : `${title}\n\n`;
    downloadTextFile(`${header}${content}`, fileName);
  }

  return (
    <div className={cn("w-full space-y-3", className)}>
      {showExport && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <GlowActionButton
              onClick={handleListen}
              disabled={!content.trim()}
              aria-pressed={audioBusy}
              contentClassName={audioBusy ? "text-orange-100" : undefined}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
              {loading ? "Preparing..." : audioBusy ? "Playing..." : "Listen Audio"}
            </GlowActionButton>
            <GlowActionButton onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              Print
            </GlowActionButton>
            <GlowActionButton onClick={handleDownload}>
              <Download className="h-4 w-4" />
              Download
            </GlowActionButton>
          </div>

          <SpeechProgressVisualizer
            active={speaking}
            loading={loading}
            progress={progress}
            currentChunk={currentChunk}
            totalChunks={totalChunks}
            audioElement={activeAudio}
            onStop={stop}
          />

          {error && <p className="text-xs text-red-300">{error}</p>}
          {printError && <p className="text-xs text-red-400">{printError}</p>}
        </>
      )}

      {showShare && (
        <div className="border-t border-sky-400/10 pt-3">
          <ResultShareIcons
            content={content}
            title={title}
            subtitle={subtitle}
            sharePath={sharePath}
            showLabel
            align="start"
          />
        </div>
      )}
    </div>
  );
}
