"use client";

import Script from "next/script";
import { adsenseConfig } from "@/lib/adsense-config";

/**
 * AdSense must load for Google's certified CMP (Privacy & messaging) to appear.
 * Consent Mode defaults deny ad storage until the user consents.
 */
export function AdSenseScript() {
  if (!adsenseConfig.enabled) return null;

  return (
    <Script
      id="adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
