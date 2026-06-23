"use client";

import Script from "next/script";
import { adsenseConfig } from "@/lib/adsense-config";
import { useCookieConsent } from "@/components/cookie-consent/cookie-consent-context";

export function ConditionalAdSenseScript() {
  const { marketingAllowed } = useCookieConsent();

  if (!adsenseConfig.enabled || !marketingAllowed) return null;

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
