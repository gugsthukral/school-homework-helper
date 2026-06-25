/** Canonical production origin — always use www for crawlers (AdSense, Google). */
export const CANONICAL_SITE_ORIGIN = "https://www.schoolhomeworkhelper.com";

/** Apex host that must redirect to www (non-www currently fails AdSense crawls). */
export const APEX_HOST = "schoolhomeworkhelper.com";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }
  return CANONICAL_SITE_ORIGIN;
}
