"use client";

import { useEffect, useState } from "react";

import { FootballIcon } from "@/components/seasonal/football-icon";
import { FIFA_2026_ANIMATION_ENABLED } from "@/lib/seasonal-config";

type FifaFootballAnimationProps = {
  mode: "screen" | "hero";
};

const FOOTBALLS = [
  { pathClass: "fifa-football-path-1" },
  { pathClass: "fifa-football-path-2" },
  { pathClass: "fifa-football-path-3" },
  { pathClass: "fifa-football-path-4" },
  { pathClass: "fifa-football-path-5" },
] as const;

/** Defer past LCP so hero image / first paint aren't competing with animation JS. */
const START_DELAY_MS = 1800;

export function FifaFootballAnimation({ mode }: FifaFootballAnimationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!FIFA_2026_ANIMATION_ENABLED) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      if (cancelled) return;
      setVisible(true);
    };

    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(start, { timeout: 1200 });
      } else {
        timeoutId = setTimeout(start, 200);
      }
    };

    timeoutId = setTimeout(schedule, START_DELAY_MS);

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fifa-football-layer fifa-football-layer--${mode}`}
      aria-hidden="true"
    >
      {FOOTBALLS.map((ball) => (
        <div
          key={ball.pathClass}
          className={`fifa-football ${ball.pathClass}`}
        >
          <FootballIcon />
        </div>
      ))}
    </div>
  );
}
