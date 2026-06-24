"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type InputActionIconButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  size?: "default" | "sm";
  className?: string;
};

export function InputActionIconButton({
  icon: Icon,
  label,
  onClick,
  disabled = false,
  active = false,
  size = "default",
  className,
}: InputActionIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "flex items-center justify-center rounded-md border transition-colors",
        size === "sm" ? "h-7 w-7" : "h-9 w-9 rounded-lg",
        active
          ? "border-orange-400/50 bg-orange-500/20 text-orange-300"
          : "border-sky-400/20 bg-sky-400/5 text-sky-200 hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-white",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
    </button>
  );
}
