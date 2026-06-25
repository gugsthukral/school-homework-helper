"use client";

import { cn } from "@/lib/utils";
import { GlowEffect } from "@/components/motion-primitives/glow-effect";

const BUTTON_GLOW_COLORS = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F"];

type GlowButtonShellProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
};

export function GlowButtonShell({
  children,
  className,
  contentClassName,
  disabled,
}: GlowButtonShellProps) {
  return (
    <span className={cn("relative inline-flex", className)}>
      {!disabled && (
        <GlowEffect
          colors={BUTTON_GLOW_COLORS}
          mode="colorShift"
          blur="soft"
          duration={3}
          scale={0.9}
        />
      )}
      <span
        className={cn(
          "theme-glow-button relative inline-flex w-full items-center justify-center rounded-xl border shadow-sm",
          disabled && "opacity-60",
          contentClassName
        )}
      >
        {children}
      </span>
    </span>
  );
}
