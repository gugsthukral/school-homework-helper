export const GUEST_USAGE_COOKIE = "ai_guest_usage";
export const GUEST_USAGE_LIMIT = 4;

export function getGuestUsesRemaining(usageCount: number) {
  return Math.max(0, GUEST_USAGE_LIMIT - usageCount);
}

export const GUEST_LIMIT_MESSAGE = `You've used your ${GUEST_USAGE_LIMIT} free tries. Sign in with Google to continue using AI tools.`;

export function guestUsageCookieOptions(count: number) {
  return {
    name: GUEST_USAGE_COOKIE,
    value: String(count),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  };
}
