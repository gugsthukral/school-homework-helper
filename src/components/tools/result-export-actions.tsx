"use client";

import { useState } from "react";
import { Download, Printer } from "lucide-react";
import { downloadTextFile, printResult } from "@/lib/export-result";
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

const buttonClassName =
  "inline-flex items-center gap-1.5 rounded-lg border border-sky-400/20 bg-navy-950/40 px-3 py-1.5 text-xs font-medium text-sky-200 transition-colors hover:border-sky-400/40 hover:text-white sm:text-sm";

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
    <div className={cn("flex w-full flex-col gap-3 sm:w-auto", className)}>
      {showExport && (
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={handlePrint} className={buttonClassName}>
            <Printer className="h-4 w-4" />
            Print
          </button>
          <button type="button" onClick={handleDownload} className={buttonClassName}>
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      )}

      {showShare && (
        <div className="space-y-2">
          <ResultShareIcons
            content={content}
            title={title}
            subtitle={subtitle}
            sharePath={sharePath}
            showLabel
            className="items-start"
          />
          {printError && <p className="text-xs text-red-400">{printError}</p>}
        </div>
      )}

      {showExport && !showShare && printError && (
        <p className="text-xs text-red-400">{printError}</p>
      )}
    </div>
  );
}
