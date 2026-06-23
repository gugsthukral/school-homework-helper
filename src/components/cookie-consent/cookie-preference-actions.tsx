"use client";

import { useCookieConsent } from "@/components/cookie-consent/cookie-consent-context";
import { cn } from "@/lib/utils";

type CookiePreferenceActionsProps = {
  className?: string;
};

export function CookiePreferenceActions({ className }: CookiePreferenceActionsProps) {
  const { choice, acceptCookies, rejectCookies, openBanner } = useCookieConsent();

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <button
        type="button"
        onClick={acceptCookies}
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
      >
        Accept all cookies
      </button>
      <button
        type="button"
        onClick={rejectCookies}
        className="inline-flex items-center justify-center rounded-full border border-sky-400/30 px-5 py-2.5 text-sm font-semibold text-sky-200 transition-colors hover:border-sky-400/50 hover:bg-sky-400/10"
      >
        Reject non-essential cookies
      </button>
      <button
        type="button"
        onClick={openBanner}
        className="inline-flex items-center justify-center rounded-full border border-sky-400/20 px-5 py-2.5 text-sm font-medium text-sky-300/80 transition-colors hover:text-orange-400"
      >
        Show cookie banner
      </button>
      {choice && (
        <p className="w-full text-sm text-sky-300/60">
          Current preference:{" "}
          <span className="font-medium text-sky-200">
            {choice === "accepted" ? "All cookies accepted" : "Only essential cookies"}
          </span>
        </p>
      )}
    </div>
  );
}
