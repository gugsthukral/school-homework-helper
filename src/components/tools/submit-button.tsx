"use client";

import { Sparkles } from "lucide-react";
import { GlowButtonShell } from "@/components/motion-primitives/glow-button-shell";
import { TextShimmer } from "@/components/motion-primitives/text-shimmer";
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
  loading: boolean;
  disabled?: boolean;
  label: string;
  loadingLabel: string;
};

const shimmerClassName =
  "text-sm font-semibold sm:text-base [--base-color:#f97316] [--base-gradient-color:#0a1628]";

export function SubmitButton({ loading, disabled, label, loadingLabel }: SubmitButtonProps) {
  const isDisabled = loading || disabled;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={cn(
        "w-full sm:w-auto",
        isDisabled ? "cursor-not-allowed" : "transition-transform hover:scale-[1.02]"
      )}
    >
      <GlowButtonShell disabled={isDisabled} className="w-full sm:w-auto">
        <span className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-800">
          {loading ? (
            <TextShimmer as="span" className={shimmerClassName} duration={1.5}>
              {loadingLabel}
            </TextShimmer>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-500" />
              {label}
            </span>
          )}
        </span>
      </GlowButtonShell>
    </button>
  );
}
