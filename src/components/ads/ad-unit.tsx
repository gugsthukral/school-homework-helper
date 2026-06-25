"use client";

import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/components/cookie-consent/cookie-consent-context";
import { adsenseConfig } from "@/lib/adsense-config";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

type AdUnitProps = {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  minHeight?: number;
};

export function AdUnit({
  slot,
  format = "auto",
  className,
  minHeight = 90,
}: AdUnitProps) {
  const initialized = useRef(false);
  const { marketingAllowed } = useCookieConsent();

  useEffect(() => {
    if (initialized.current || !adsenseConfig.enabled || !slot || !marketingAllowed) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initialized.current = true;
    } catch {
      // AdSense may not be ready yet on first paint
    }
  }, [slot, marketingAllowed]);

  if (!adsenseConfig.enabled || !slot || !marketingAllowed) return null;

  return (
    <aside
      className={cn("my-6 flex w-full flex-col items-center", className)}
      aria-label="Advertisement"
    >
      <span className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-sky-400/35">
        Advertisement
      </span>
      <div
        className="w-full overflow-hidden rounded-xl border border-slate-200 bg-navy-950/30"
        style={{ minHeight }}
      >
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={adsenseConfig.clientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={format === "auto" ? "true" : undefined}
        />
      </div>
    </aside>
  );
}
