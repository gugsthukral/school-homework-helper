export const COOKIE_CONSENT_NAME = "cookie_consent";
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

export type CookieConsentChoice = "accepted" | "rejected";

export function isCookieConsentChoice(value: string | null | undefined): value is CookieConsentChoice {
  return value === "accepted" || value === "rejected";
}

export function readCookieConsent(): CookieConsentChoice | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_CONSENT_NAME}=([^;]*)`)
  );
  const value = match?.[1] ? decodeURIComponent(match[1]) : null;

  return isCookieConsentChoice(value) ? value : null;
}

export function writeCookieConsent(choice: CookieConsentChoice) {
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = [
    `${COOKIE_CONSENT_NAME}=${encodeURIComponent(choice)}`,
    "path=/",
    `max-age=${COOKIE_CONSENT_MAX_AGE}`,
    "SameSite=Lax",
    secure,
  ]
    .filter(Boolean)
    .join("; ");
}

export function hasMarketingConsent(choice: CookieConsentChoice | null) {
  return choice === "accepted";
}
