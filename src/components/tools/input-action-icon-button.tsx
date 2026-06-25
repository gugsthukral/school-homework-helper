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
        "theme-input-action-btn flex items-center justify-center rounded-md border transition-colors",
        size === "sm" ? "h-7 w-7" : "h-9 w-9 rounded-lg",
        active && "theme-input-action-btn-active",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
    </button>
  );
}
