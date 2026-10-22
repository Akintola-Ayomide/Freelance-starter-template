import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Environment variable validation via @t3-oss/env-nextjs + Zod.
 * Import this file (not process.env) everywhere you need env vars.
 *
 * The app will fail at startup with a clear error message if any
 * required variable is missing or invalid.
 */
export const env = createEnv({
  /**
   * Server-side environment variables — only available on the server.
   * Do NOT prefix these with NEXT_PUBLIC_.
   */
  server: {
    // Database
    DATABASE_URL: z.string().url("DATABASE_URL must be a valid PostgreSQL connection string"),

    // Better Auth
    BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET must be at least 32 characters"),
    BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL"),

    // Email — optional; falls back to console logging when absent
    RESEND_API_KEY: z.string().optional(),
    EMAIL_FROM: z
      .string()
      .email("EMAIL_FROM must be a valid email address")
      .default("noreply@example.com"),

    // Google OAuth — optional; only activated when both vars present
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),

    // Node environment
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

    // Seed data (only used by prisma/seed.ts — optional at runtime)
    SEED_ADMIN_EMAIL: z.string().email().optional(),
    SEED_ADMIN_PASSWORD: z.string().min(8).optional(),
    SEED_ADMIN_NAME: z.string().optional(),
    SEED_DEMO_EMAIL: z.string().email().optional(),
    SEED_DEMO_PASSWORD: z.string().min(8).optional(),
    SEED_DEMO_NAME: z.string().optional(),
  },

  /**
   * Client-side environment variables — available in the browser.
   * These must be prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z
      .string()
      .url("NEXT_PUBLIC_APP_URL must be a valid URL")
      .default("http://localhost:3000"),
  },

  /**
   * Map process.env to the above schemas.
   * Destructure to avoid sending all of process.env to the client.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL,
    SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD,
    SEED_ADMIN_NAME: process.env.SEED_ADMIN_NAME,
    SEED_DEMO_EMAIL: process.env.SEED_DEMO_EMAIL,
    SEED_DEMO_PASSWORD: process.env.SEED_DEMO_PASSWORD,
    SEED_DEMO_NAME: process.env.SEED_DEMO_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  /**
   * Skip validation during build if the full env is not available.
   * Set SKIP_ENV_VALIDATION=1 in CI build steps if needed.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Throw if a NEXT_PUBLIC_ var is accessed on the server.
   * Throw if a server var is accessed on the client.
   */
  emptyStringAsUndefined: true,
});
