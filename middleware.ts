import { NextResponse, type NextRequest } from "next/server";
import { APEX_HOST, CANONICAL_SITE_ORIGIN } from "@/lib/site-url";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (host === APEX_HOST) {
    const destination = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      CANONICAL_SITE_ORIGIN
    );
    return NextResponse.redirect(destination, 308);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|ads.txt|humans.txt|google[0-9a-f]+\\.html|.*\\.(?:svg|png|jpg|jpeg|gif|webp|html|txt)$).*)",
  ],
};
