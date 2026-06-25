"use client";

import { cn } from "@/lib/utils";
import { GlowEffect } from "@/components/motion-primitives/glow-effect";

const THEME_GLOW_COLORS = ["#38bdf8", "#fb923c", "#0ea5e9", "#f97316"];

type GlowCardProps = {
  active?: boolean;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function GlowCard({ active = false, children, className, contentClassName }: GlowCardProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      {active && (
        <GlowEffect
          mode="rotate"
          colors={THEME_GLOW_COLORS}
          blur="strong"
          className="opacity-40"
          duration={4}
        />
      )}
      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  );
}
