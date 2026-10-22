import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Get the current session in a Server Component or Server Action.
 * Returns null if not authenticated.
 */
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

/**
 * Get the current user in a Server Component or Server Action.
 * Returns null if not authenticated.
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

/**
 * Require authentication. Redirects to /sign-in if not authenticated.
 * Use in protected Server Components and Server Actions.
 *
 * Usage:
 * ```ts
 * const user = await requireAuth();
 * // user is guaranteed to be defined here
 * ```
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return user;
}

/**
 * Require a specific role. Redirects to /dashboard if role doesn't match.
 * Use to protect admin-only routes.
 *
 * Usage:
 * ```ts
 * const user = await requireRole("admin");
 * ```
 */
export async function requireRole(role: "user" | "admin") {
  const user = await requireAuth();

  if (user.role !== role && user.role !== "admin") {
    // Non-admins trying to access admin pages go to dashboard
    redirect("/dashboard");
  }

  return user;
}

/**
 * Redirect authenticated users away from auth pages (sign-in, sign-up).
 * Use on pages like /sign-in to prevent already-logged-in users from seeing them.
 */
export async function redirectIfAuthenticated(to = "/dashboard") {
  const user = await getCurrentUser();
  if (user) {
    redirect(to);
  }
}
