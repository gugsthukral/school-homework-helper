export const GOOGLE_ADS_VENDOR_ID = "755";

export function ensureGtag() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
}

export function updateGoogleConsent(granted: boolean) {
  if (typeof window === "undefined") return;

  ensureGtag();
  const status = granted ? "granted" : "denied";

  window.gtag?.("consent", "update", {
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
    analytics_storage: status,
  });
}

export function tcfDataAllowsMarketing(tcData: {
  gdprApplies?: boolean;
  purpose?: { consents?: Record<string, boolean> };
  vendor?: { consents?: Record<string, boolean> };
}): boolean {
  if (!tcData.gdprApplies) return false;

  const storageConsent = Boolean(tcData.purpose?.consents?.["1"]);
  const googleVendorConsent = Boolean(tcData.vendor?.consents?.[GOOGLE_ADS_VENDOR_ID]);

  return storageConsent && googleVendorConsent;
}

export function openGooglePrivacySettings() {
  if (typeof window === "undefined" || !window.googlefc) return false;

  window.googlefc.callbackQueue = window.googlefc.callbackQueue ?? [];
  window.googlefc.callbackQueue.push(window.googlefc.showRevocationMessage);
  return true;
}
