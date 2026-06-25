"use client";

import { useEffect, useRef, useState } from "react";
import { Square } from "lucide-react";
import { cn } from "@/lib/utils";

type SpeechProgressVisualizerProps = {
  active: boolean;
  loading?: boolean;
  progress?: number;
  currentChunk?: number;
  totalChunks?: number;
  audioElement?: HTMLAudioElement | null;
  onStop?: () => void;
  className?: string;
};

const BAR_COUNT = 48;

const SKELETON_ROWS = [
  ["w-full", "w-[92%]", "w-[78%]", "w-[95%]", "w-[88%]"],
  ["w-[85%]", "w-full", "w-[70%]", "w-[90%]", "w-[82%]"],
  ["w-[75%]", "w-[88%]", "w-full", "w-[68%]", "w-[94%]"],
  ["w-[90%]", "w-[72%]", "w-[86%]", "w-full", "w-[80%]"],
];

function useSimulatedBars(active: boolean, loading?: boolean) {
  const [heights, setHeights] = useState<number[]>(() => Array(BAR_COUNT).fill(20));

  useEffect(() => {
    if (!active && !loading) {
      setHeights(Array(BAR_COUNT).fill(12));
      return;
    }

    const interval = window.setInterval(() => {
      setHeights(
        Array.from({ length: BAR_COUNT }, (_, index) => {
          const center = (BAR_COUNT - 1) / 2;
          const dist = Math.abs(index - center) / center;
          const envelope = 1 - dist * 0.35;
          const wave = Math.sin(Date.now() / 140 + index * 0.45) * 0.5 + 0.5;
          const jitter = Math.random() * (loading ? 8 : 20);
          const base = loading ? 10 : 14;
          return (base + wave * (loading ? 14 : 28) + jitter) * envelope;
        })
      );
    }, loading ? 110 : 75);

    return () => window.clearInterval(interval);
  }, [active, loading]);

  return heights;
}

function useLiveAudioBars(audioElement: HTMLAudioElement | null | undefined, active: boolean) {
  const [heights, setHeights] = useState<number[]>(() => Array(BAR_COUNT).fill(12));
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!active || !audioElement) return;

    let analyser: AnalyserNode | null = null;
    let source: MediaElementAudioSourceNode | null = null;
    let raf = 0;
    let cancelled = false;

    async function setup() {
      if (!audioElement) return;
      try {
        const context = contextRef.current ?? new AudioContext();
        contextRef.current = context;
        if (context.state === "suspended") {
          await context.resume();
        }

        source = context.createMediaElementSource(audioElement);
        analyser = context.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.78;
        source.connect(analyser);
        analyser.connect(context.destination);

        const data = new Uint8Array(analyser.frequencyBinCount);

        const tick = () => {
          if (cancelled || !analyser) return;
          analyser.getByteFrequencyData(data);

          const next = Array.from({ length: BAR_COUNT }, (_, index) => {
            const center = (BAR_COUNT - 1) / 2;
            const dist = Math.abs(index - center) / center;
            const envelope = 1 - dist * 0.3;
            const sampleIndex = Math.floor((index / BAR_COUNT) * data.length);
            const value = data[sampleIndex] ?? 0;
            return (8 + (value / 255) * 52) * envelope;
          });

          setHeights(next);
          raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
      } catch {
        // fallback to simulated bars
      }
    }

    void setup();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      try {
        source?.disconnect();
        analyser?.disconnect();
      } catch {
        // ignore
      }
    };
  }, [active, audioElement]);

  return heights;
}

export function SpeechProgressVisualizer({
  active,
  loading = false,
  progress = 0,
  currentChunk = 0,
  totalChunks = 0,
  audioElement = null,
  onStop,
  className,
}: SpeechProgressVisualizerProps) {
  const simulatedHeights = useSimulatedBars(active, loading);
  const liveHeights = useLiveAudioBars(audioElement, active && !loading);
  const useLive = Boolean(active && !loading && audioElement);
  const heights = useLive ? liveHeights : simulatedHeights;

  if (!active && !loading) return null;

  const clampedProgress = Math.min(1, Math.max(0, progress));
  const progressPercent = Math.round(clampedProgress * 100);
  const statusLabel = loading
    ? "Preparing audio"
    : totalChunks > 1
      ? `Part ${currentChunk} of ${totalChunks}`
      : "Now playing";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200 bg-sky-50/80 shadow-sm",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={`${statusLabel}, ${progressPercent}% complete`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "h-2 w-2 shrink-0 rounded-full",
              loading ? "animate-pulse bg-sky-400" : "animate-pulse bg-orange-400"
            )}
          />
          <span className="truncate text-xs font-medium text-slate-600">{statusLabel}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-xs font-semibold tabular-nums text-orange-500">
            {loading ? "..." : `${progressPercent}%`}
          </span>
          {onStop && (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop audio"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 transition-colors hover:border-orange-200 hover:text-orange-600"
            >
              <Square className="h-3 w-3 fill-red-500 text-red-500" />
              Stop
            </button>
          )}
        </div>
      </div>

      <div className="bg-white px-4 py-4">
        {loading ? (
          <div className="flex flex-col gap-2" aria-hidden>
            {SKELETON_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-1.5">
                {row.map((widthClass, pillIndex) => (
                  <div
                    key={pillIndex}
                    className={cn("h-1.5 animate-pulse rounded-full bg-sky-300", widthClass)}
                    style={{ animationDelay: `${(rowIndex * 5 + pillIndex) * 80}ms` }}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-10 items-end justify-center gap-[3px] sm:h-11">
            {heights.map((height, index) => (
              <span
                key={index}
                className="w-[3px] shrink-0 rounded-sm bg-orange-400 transition-[height] duration-75"
                style={{ height: `${Math.min(100, Math.max(18, height))}%` }}
              />
            ))}
          </div>
        )}

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-300",
              loading ? "w-2/5 animate-pulse bg-sky-400" : "bg-orange-400"
            )}
            style={loading ? undefined : { width: `${Math.max(progressPercent, 3)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
