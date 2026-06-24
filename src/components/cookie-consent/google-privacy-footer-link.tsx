"use client";

import { useCookieConsent } from "@/components/cookie-consent/cookie-consent-context";

export function GooglePrivacyFooterLink() {
  const { googleGdprApplies, openGooglePrivacySettings } = useCookieConsent();

  if (!googleGdprApplies) return null;

  return (
    <button
      type="button"
      onClick={openGooglePrivacySettings}
      className="text-sm text-sky-300/40 hover:text-sky-300"
    >
      Privacy &amp; cookie settings
    </button>
  );
}
