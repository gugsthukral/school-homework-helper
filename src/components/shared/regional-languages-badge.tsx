import { Languages } from "lucide-react";
import { REGIONAL_LANGUAGES_DETAIL, REGIONAL_LANGUAGES_TAGLINE } from "@/lib/indian-languages";
import { cn } from "@/lib/utils";

type RegionalLanguagesBadgeProps = {
  className?: string;
  showDetail?: boolean;
  centered?: boolean;
  variant?: "dark" | "light" | "inverted";
};

export function RegionalLanguagesBadge({
  className,
  showDetail = false,
  centered = false,
  variant = "light",
}: RegionalLanguagesBadgeProps) {
  const isLight = variant === "light";
  const isInverted = variant === "inverted";

  return (
    <div className={cn(centered && "text-center", className)}>
      <div
        className={cn(
          "regional-languages-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium",
          isInverted
            ? "border border-white/30 bg-white/15 text-slate-900"
            : isLight
              ? "border border-orange-200 bg-orange-50 text-orange-700"
              : "border border-orange-400/25 bg-orange-500/10 text-orange-200",
          centered && "mx-auto"
        )}
      >
        <Languages className={cn("h-4 w-4 shrink-0", isInverted ? "text-slate-900" : "text-orange-500")} aria-hidden />
        <span>{REGIONAL_LANGUAGES_TAGLINE}</span>
      </div>
      {showDetail && (
        <p
          className={cn(
            "regional-languages-badge-detail mt-3 max-w-2xl text-sm leading-relaxed",
            isInverted ? "text-slate-900/85" : isLight ? "text-slate-500" : "text-slate-700/65",
            centered && "mx-auto"
          )}
        >
          {REGIONAL_LANGUAGES_DETAIL}
        </p>
      )}
    </div>
  );
}
