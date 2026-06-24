"use client";

import { useState } from "react";
import { Download, Loader2, Printer, Volume2 } from "lucide-react";
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

const toolbarButtonClassName =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-sky-400/20 bg-navy-950/50 px-3 py-2 text-xs font-medium text-sky-200 transition-colors hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-white sm:text-sm";

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
            <button
              type="button"
              onClick={handleListen}
              disabled={!content.trim()}
              aria-pressed={audioBusy}
              className={cn(
                toolbarButtonClassName,
                audioBusy && "border-orange-400/40 bg-orange-500/15 text-orange-100",
                !content.trim() && "cursor-not-allowed opacity-50"
              )}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
              {loading ? "Preparing..." : audioBusy ? "Playing..." : "Listen Audio"}
            </button>
            <button type="button" onClick={handlePrint} className={toolbarButtonClassName}>
              <Printer className="h-4 w-4" />
              Print
            </button>
            <button type="button" onClick={handleDownload} className={toolbarButtonClassName}>
              <Download className="h-4 w-4" />
              Download
            </button>
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
