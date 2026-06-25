"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  variant?: "topbar" | "navbar";
};

export function ThemeToggle({ className, variant = "topbar" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
        variant === "topbar"
          ? isDark
            ? "text-sky-300 hover:bg-sky-400/10 hover:text-orange-400"
            : "text-slate-500 hover:bg-slate-100 hover:text-orange-500"
          : isDark
            ? "text-sky-300 hover:bg-sky-400/10 hover:text-white"
            : "text-navy-900 hover:bg-slate-50 hover:text-orange-500",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
