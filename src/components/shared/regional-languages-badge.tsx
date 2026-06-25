import { Languages } from "lucide-react";
import { REGIONAL_LANGUAGES_DETAIL, REGIONAL_LANGUAGES_TAGLINE } from "@/lib/indian-languages";
import { cn } from "@/lib/utils";

type RegionalLanguagesBadgeProps = {
  className?: string;
  showDetail?: boolean;
  centered?: boolean;
};

export function RegionalLanguagesBadge({
  className,
  showDetail = false,
  centered = false,
}: RegionalLanguagesBadgeProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-200",
          centered && "mx-auto"
        )}
      >
        <Languages className="h-4 w-4 shrink-0 text-orange-400" aria-hidden />
        <span>{REGIONAL_LANGUAGES_TAGLINE}</span>
      </div>
      {showDetail && (
        <p
          className={cn(
            "mt-3 max-w-2xl text-sm leading-relaxed text-sky-200/65",
            centered && "mx-auto"
          )}
        >
          {REGIONAL_LANGUAGES_DETAIL}
        </p>
      )}
    </div>
  );
}
