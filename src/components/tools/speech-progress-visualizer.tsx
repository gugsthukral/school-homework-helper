"use client";

import { useEffect, useRef, useState } from "react";
import { VolumeX } from "lucide-react";
import { GlowActionButton } from "@/components/motion-primitives/glow-action-button";
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

const BAR_COUNT = 28;

function useSimulatedBars(active: boolean, loading?: boolean) {
  const [heights, setHeights] = useState<number[]>(() => Array(BAR_COUNT).fill(24));

  useEffect(() => {
    if (!active && !loading) {
      setHeights(Array(BAR_COUNT).fill(14));
      return;
    }

    const interval = window.setInterval(() => {
      setHeights(
        Array.from({ length: BAR_COUNT }, (_, index) => {
          const center = (BAR_COUNT - 1) / 2;
          const dist = Math.abs(index - center) / center;
          const envelope = 1 - dist * 0.35;
          const wave = Math.sin(Date.now() / 140 + index * 0.45) * 0.5 + 0.5;
          const jitter = Math.random() * (loading ? 10 : 28);
          const base = loading ? 16 : 22;
          return (base + wave * (loading ? 18 : 40) + jitter) * envelope;
        })
      );
    }, loading ? 110 : 75);

    return () => window.clearInterval(interval);
  }, [active, loading]);

  return heights;
}

function useLiveAudioBars(audioElement: HTMLAudioElement | null | undefined, active: boolean) {
  const [heights, setHeights] = useState<number[]>(() => Array(BAR_COUNT).fill(16));
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
            return (12 + (value / 255) * 68) * envelope;
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
        "overflow-hidden rounded-xl border border-sky-400/25 bg-gradient-to-br from-navy-950/90 via-navy-900/80 to-navy-950/90 shadow-inner shadow-sky-400/5",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={`${statusLabel}, ${progressPercent}% complete`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-sky-400/10 px-3 py-2 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "h-2 w-2 shrink-0 rounded-full",
              loading ? "animate-pulse bg-sky-400" : "animate-pulse bg-orange-400"
            )}
          />
          <span className="truncate text-xs font-medium text-sky-100">{statusLabel}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-xs font-semibold tabular-nums text-orange-300">
            {loading ? "..." : `${progressPercent}%`}
          </span>
          {onStop && (
            <GlowActionButton
              onClick={onStop}
              contentClassName="gap-1 px-2 py-1 text-[11px] text-orange-100"
              aria-label="Stop audio"
            >
              <VolumeX className="h-3 w-3" />
              Stop
            </GlowActionButton>
          )}
        </div>
      </div>

      <div className="px-3 py-3 sm:px-4">
        <div className="flex h-12 items-end justify-between gap-[2px] sm:h-14 sm:gap-[3px]">
          {heights.map((height, index) => (
            <span
              key={index}
              className={cn(
                "min-w-0 flex-1 rounded-full transition-[height] duration-75",
                loading
                  ? "bg-sky-400/30"
                  : "bg-gradient-to-t from-orange-500/80 via-orange-400/50 to-sky-400/90"
              )}
              style={{ height: `${Math.min(100, Math.max(14, height))}%` }}
            />
          ))}
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy-950/80 ring-1 ring-sky-400/10">
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-300",
              loading
                ? "w-2/5 animate-pulse bg-sky-400/50"
                : "bg-gradient-to-r from-sky-400 via-sky-300 to-orange-400"
            )}
            style={loading ? undefined : { width: `${Math.max(progressPercent, 3)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
