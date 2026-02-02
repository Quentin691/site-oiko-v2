import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidSession } from "@/lib/session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ne protéger que /admin (sauf /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin-session");

    if (!isValidSession(session?.value)) {
      // Rediriger vers la page de login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};