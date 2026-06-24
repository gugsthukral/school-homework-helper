import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|ads.txt|humans.txt|google[0-9a-f]+\\.html|.*\\.(?:svg|png|jpg|jpeg|gif|webp|html|txt)$).*)",
  ],
};
