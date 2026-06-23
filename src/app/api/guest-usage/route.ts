import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import {
  GUEST_USAGE_LIMIT,
  getGuestUsesRemaining,
} from "@/lib/guest-usage-limit";
import { getGuestUsageCount } from "@/lib/guest-usage-limit.server";

export async function GET() {
  const user = await getAuthenticatedUser();

  if (user) {
    return NextResponse.json({ authenticated: true });
  }

  const uses = await getGuestUsageCount();
  const remaining = getGuestUsesRemaining(uses);

  return NextResponse.json({
    authenticated: false,
    uses,
    remaining,
    limit: GUEST_USAGE_LIMIT,
    limitReached: uses >= GUEST_USAGE_LIMIT,
  });
}
