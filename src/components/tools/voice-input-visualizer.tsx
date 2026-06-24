"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type VoiceInputVisualizerProps = {
  active: boolean;
  className?: string;
};

const BAR_COUNT = 18;

function useSimulatedBars(active: boolean) {
  const [heights, setHeights] = useState<number[]>(() => Array(BAR_COUNT).fill(20));

  useEffect(() => {
    if (!active) {
      setHeights(Array(BAR_COUNT).fill(12));
      return;
    }

    const interval = window.setInterval(() => {
      setHeights(
        Array.from({ length: BAR_COUNT }, (_, index) => {
          const wave = Math.sin(Date.now() / 120 + index * 0.55) * 0.5 + 0.5;
          const jitter = Math.random() * 22;
          return 14 + wave * 28 + jitter;
        })
      );
    }, 80);

    return () => window.clearInterval(interval);
  }, [active]);

  return heights;
}

export function VoiceInputVisualizer({ active, className }: VoiceInputVisualizerProps) {
  const heights = useSimulatedBars(active);

  if (!active) return null;

  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 rounded-lg bg-navy-950/70 px-2.5 py-1.5 backdrop-blur-sm ring-1 ring-orange-400/25",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="Listening to your voice"
    >
      <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-orange-400" />
      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-orange-200/90 sm:text-[11px]">
        Listening
      </span>
      <div className="flex h-5 min-w-0 flex-1 items-end justify-end gap-[2px] sm:h-6">
        {heights.map((height, index) => (
          <span
            key={index}
            className="min-w-0 max-w-[3px] flex-1 rounded-full bg-gradient-to-t from-orange-500/90 via-orange-400/60 to-sky-400/80 transition-[height] duration-75"
            style={{ height: `${Math.min(100, Math.max(18, height))}%` }}
          />
        ))}
      </div>
    </div>
  );
}
