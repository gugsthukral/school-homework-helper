"use client";

import { useEffect, useState } from "react";

import { FootballIcon } from "@/components/seasonal/football-icon";
import { FIFA_2026_ANIMATION_ENABLED } from "@/lib/seasonal-config";

const FOOTBALLS = [
  { pathClass: "fifa-football-path-1", duration: 16, delay: 0, size: 50 },
  { pathClass: "fifa-football-path-2", duration: 18, delay: 1.2, size: 48 },
  { pathClass: "fifa-football-path-3", duration: 15, delay: 2.4, size: 46 },
  { pathClass: "fifa-football-path-4", duration: 19, delay: 0.6, size: 50 },
  { pathClass: "fifa-football-path-5", duration: 17, delay: 3, size: 44 },
] as const;

export function FifaFootballAnimation() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!FIFA_2026_ANIMATION_ENABLED) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fifa-football-layer" aria-hidden="true">
      {FOOTBALLS.map((ball) => (
        <div
          key={ball.pathClass}
          className={`fifa-football ${ball.pathClass}`}
          style={{
            animationDuration: `${ball.duration}s`,
            animationDelay: `${ball.delay}s`,
          }}
        >
          <FootballIcon size={ball.size} />
        </div>
      ))}
    </div>
  );
}
