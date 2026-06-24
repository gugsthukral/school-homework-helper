"use client";

import type { ReactNode } from "react";
import { AdSenseScript } from "@/components/cookie-consent/adsense-script";
import { CookieConsentBanner } from "@/components/cookie-consent/cookie-consent-banner";
import { CookieConsentProvider } from "@/components/cookie-consent/cookie-consent-context";

export function CookieConsentRoot({ children }: { children: ReactNode }) {
  return (
    <CookieConsentProvider>
      <AdSenseScript />
      {children}
      <CookieConsentBanner />
    </CookieConsentProvider>
  );
}
