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

const actionButtonClass =
  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50";

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
                actionButtonClass,
                audioBusy
                  ? "border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100"
                  : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-600"
              )}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
              {loading ? "Preparing..." : speaking ? "Playing..." : "Listen Audio"}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className={cn(
                actionButtonClass,
                "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              )}
            >
              <Printer className="h-4 w-4" />
              Print
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className={cn(
                actionButtonClass,
                "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              )}
            >
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

          {error && <p className="text-xs text-red-600">{error}</p>}
          {printError && <p className="text-xs text-red-600">{printError}</p>}
        </>
      )}

      {showShare && (
        <div className="border-t border-slate-200 pt-3">
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
