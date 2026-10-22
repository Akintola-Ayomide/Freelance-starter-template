import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Better Auth catch-all route handler.
 * All auth operations (sign-in, sign-up, OAuth callbacks, etc.) go through here.
 * Route: /api/auth/[...all]
 */
export const { GET, POST } = toNextJsHandler(auth);
