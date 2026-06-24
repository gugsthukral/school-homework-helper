"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type VoiceInputVisualizerProps = {
  active: boolean;
  analyserRef?: React.RefObject<AnalyserNode | null>;
  micReady?: boolean;
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

function useLiveMicBars(
  analyserRef: React.RefObject<AnalyserNode | null> | undefined,
  active: boolean
) {
  const [heights, setHeights] = useState<number[]>(() => Array(BAR_COUNT).fill(14));

  useEffect(() => {
    if (!active) {
      setHeights(Array(BAR_COUNT).fill(12));
      return;
    }

    let raf = 0;
    let cancelled = false;
    const data = new Uint8Array(64);

    const tick = () => {
      if (cancelled) return;

      const analyser = analyserRef?.current;
      if (analyser) {
        analyser.getByteFrequencyData(data);
        const next = Array.from({ length: BAR_COUNT }, (_, index) => {
          const sampleIndex = Math.floor((index / BAR_COUNT) * data.length);
          const value = data[sampleIndex] ?? 0;
          return 10 + (value / 255) * 58;
        });
        setHeights(next);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [active, analyserRef]);

  return { heights };
}

export function VoiceInputVisualizer({
  active,
  analyserRef,
  micReady = false,
  className,
}: VoiceInputVisualizerProps) {
  const simulatedHeights = useSimulatedBars(active);
  const { heights: liveHeights } = useLiveMicBars(analyserRef, active && micReady);
  const useLive = Boolean(active && micReady && analyserRef?.current);
  const heights = useLive ? liveHeights : simulatedHeights;

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
      <div className="flex min-w-0 flex-1 items-end justify-end gap-[2px] h-5 sm:h-6">
        {heights.map((height, index) => (
          <span
            key={index}
            className="min-w-0 flex-1 max-w-[3px] rounded-full bg-gradient-to-t from-orange-500/90 via-orange-400/60 to-sky-400/80 transition-[height] duration-75"
            style={{ height: `${Math.min(100, Math.max(18, height))}%` }}
          />
        ))}
      </div>
    </div>
  );
}
