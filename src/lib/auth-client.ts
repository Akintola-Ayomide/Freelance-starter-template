"use client";

import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { env } from "@/env";

/**
 * Better Auth browser client.
 *
 * Use this in Client Components and hooks.
 * For Server Components, use the server-side `auth` instance from @/lib/auth.
 *
 * Usage:
 * ```tsx
 * import { authClient } from "@/lib/auth-client";
 *
 * // In a component:
 * const { data: session } = authClient.useSession();
 * await authClient.signIn.email({ email, password });
 * await authClient.signOut();
 * ```
 */
export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL,
  plugins: [adminClient()],
});

// Re-export commonly used hooks and methods for convenience
export const {
  useSession,
  signIn,
  signUp,
  signOut,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
} = authClient;
