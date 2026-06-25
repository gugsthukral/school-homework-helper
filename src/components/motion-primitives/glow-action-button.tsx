"use client";

import { GlowButtonShell } from "@/components/motion-primitives/glow-button-shell";
import { cn } from "@/lib/utils";

type GlowActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  shellClassName?: string;
  contentClassName?: string;
};

export function GlowActionButton({
  children,
  className,
  shellClassName,
  contentClassName,
  disabled,
  type = "button",
  ...props
}: GlowActionButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "transition-transform hover:scale-[1.02]",
        disabled && "cursor-not-allowed",
        className
      )}
      {...props}
    >
      <GlowButtonShell disabled={disabled} className={shellClassName}>
        <span
          className={cn(
            "inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium sm:text-sm",
            contentClassName
          )}
        >
          {children}
        </span>
      </GlowButtonShell>
    </button>
  );
}
