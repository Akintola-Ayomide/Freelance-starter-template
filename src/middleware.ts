import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Next.js middleware for route protection.
 *
 * Protected routes: /dashboard, /settings (and any sub-routes)
 * Auth routes: /sign-in, /sign-up, etc. (redirect to dashboard if already logged in)
 *
 * We use better-auth's getSessionCookie() for edge-compatible session checking.
 * This avoids hitting the database on every request.
 * Full session validation (DB lookup) happens in the route handler or Server Component.
 */

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/settings"];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for a session cookie (edge-compatible, no DB hit)
  const sessionCookie = getSessionCookie(request);
  const isAuthenticated = !!sessionCookie;

  // Redirect unauthenticated users away from protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Redirect authenticated users away from auth routes
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder files
     * - api/auth (better-auth's own routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)|api/auth).*)",
  ],
};
