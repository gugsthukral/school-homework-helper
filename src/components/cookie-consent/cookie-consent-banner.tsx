"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useCookieConsent } from "@/components/cookie-consent/cookie-consent-context";
import { cn } from "@/lib/utils";

export function CookieConsentBanner() {
  const { bannerOpen, acceptCookies, rejectCookies } = useCookieConsent();

  if (!bannerOpen) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-sky-400/20 bg-navy-950/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
        <div className="flex min-w-0 items-start gap-4">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-400">
            <Cookie className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 id="cookie-consent-title" className="text-base font-semibold text-white">
              We use cookies
            </h2>
            <p id="cookie-consent-description" className="mt-1 text-sm leading-relaxed text-sky-200/70">
              We use essential cookies to run the site. Optional cookies for ads are only enabled if
              you accept below. Visitors in the EEA, UK, and Switzerland see Google&apos;s consent
              message for ad choices.{" "}
              <Link href="/cookies" className="font-medium text-orange-400 hover:underline">
                Cookie Policy
              </Link>
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={rejectCookies}
            className={cn(
              "inline-flex items-center justify-center rounded-full border border-sky-400/30 px-5 py-2.5 text-sm font-semibold text-sky-200 transition-colors",
              "hover:border-sky-400/50 hover:bg-sky-400/10"
            )}
          >
            Reject
          </button>
          <button
            type="button"
            onClick={acceptCookies}
            className={cn(
              "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all",
              "hover:scale-105 hover:shadow-orange-500/40"
            )}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
