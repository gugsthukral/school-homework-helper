"use client";

import { useCookieConsent } from "@/components/cookie-consent/cookie-consent-context";

export function GooglePrivacyFooterLink() {
  const { googleGdprApplies, openGooglePrivacySettings } = useCookieConsent();

  if (!googleGdprApplies) return null;

  return (
    <button
      type="button"
      onClick={openGooglePrivacySettings}
      className="theme-footer-muted text-sm transition-colors hover:text-orange-500"
    >
      Privacy &amp; cookie settings
    </button>
  );
}
