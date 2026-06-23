"use client";

import type { ReactNode } from "react";
import { CookieConsentBanner } from "@/components/cookie-consent/cookie-consent-banner";
import { CookieConsentProvider } from "@/components/cookie-consent/cookie-consent-context";
import { ConditionalAdSenseScript } from "@/components/cookie-consent/conditional-adsense-script";

export function CookieConsentRoot({ children }: { children: ReactNode }) {
  return (
    <CookieConsentProvider>
      <ConditionalAdSenseScript />
      {children}
      <CookieConsentBanner />
    </CookieConsentProvider>
  );
}
