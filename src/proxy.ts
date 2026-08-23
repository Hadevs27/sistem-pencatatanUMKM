import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  // Protect dashboard routes
  if (!session && !request.nextUrl.pathname.startsWith("/login") && !request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session) {
    try {
      const payload = await decrypt(session);
      const user = payload.user as { role: string };

      // If valid session and trying to access login, redirect to dashboard
      if (request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Role based access control
      if (user.role === "Staff") {
        const path = request.nextUrl.pathname;
        if (
          path.startsWith("/inventori") ||
          path.startsWith("/laporan") ||
          path.startsWith("/pengguna")
        ) {
          return NextResponse.redirect(new URL("/", request.url));
        }
      }
    } catch (error) {
      // Invalid session, redirect to login
      if (!request.nextUrl.pathname.startsWith("/login") && !request.nextUrl.pathname.startsWith("/api/auth")) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
