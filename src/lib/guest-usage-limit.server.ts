import "server-only";

import { cookies } from "next/headers";
import { GUEST_USAGE_COOKIE } from "@/lib/guest-usage-limit";

export async function getGuestUsageCount(): Promise<number> {
  const cookieStore = await cookies();
  const value = cookieStore.get(GUEST_USAGE_COOKIE)?.value;
  const count = Number.parseInt(value ?? "0", 10);
  return Number.isNaN(count) ? 0 : count;
}
