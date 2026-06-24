"use client";

import type { ReactNode } from "react";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { AdSenseScript } from "@/components/cookie-consent/adsense-script";
import { ConsentModeDefaults } from "@/components/cookie-consent/consent-mode-defaults";
import { CookieConsentBanner } from "@/components/cookie-consent/cookie-consent-banner";
import { CookieConsentProvider } from "@/components/cookie-consent/cookie-consent-context";

export function CookieConsentRoot({ children }: { children: ReactNode }) {
  return (
    <>
      <ConsentModeDefaults />
      <GoogleAnalytics />
      <CookieConsentProvider>
        <AdSenseScript />
        {children}
        <CookieConsentBanner />
      </CookieConsentProvider>
    </>
  );
}
