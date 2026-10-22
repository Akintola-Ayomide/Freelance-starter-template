import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { db } from "@/lib/db";
import { env } from "@/env";
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/email";

/**
 * Better Auth server instance.
 *
 * Plugins enabled:
 * - admin: Adds role management (user | admin) and user administration features.
 *
 * Optional providers:
 * - Google OAuth: Only enabled when GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set.
 */
export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  // Base URL for auth callbacks and redirects
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,

  // Session configuration
  session: {
    // Sessions are stored in the DB (not JWT) for easy revocation
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // Refresh session if older than 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache session cookie for 5 minutes
    },
  },

  // Email + Password auth
  emailAndPassword: {
    enabled: true,

    // Require email verification before allowing sign-in
    requireEmailVerification: true,

    // Send password reset email
    sendResetPassword: async ({
      user,
      url,
    }: {
      user: { email: string; name: string };
      url: string;
    }) => {
      await sendPasswordResetEmail({
        to: user.email,
        name: user.name,
        resetUrl: url,
      });
    },

    // Password requirements
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  // Email verification configuration
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({
      user,
      url,
    }: {
      user: { email: string; name: string };
      url: string;
    }) => {
      await sendVerificationEmail({
        to: user.email,
        name: user.name,
        verificationUrl: url,
      });
    },
  },

  // Social providers — only enabled when env vars are present
  socialProviders: {
    ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
  },

  // Plugins
  plugins: [
    admin({
      // Default role for new users
      defaultRole: "user",
      // Roles available in the system
      adminRole: "admin",
    }),
  ],

  // Callbacks
  user: {
    // Called after a new user is successfully created
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        required: false,
        input: false, // Not settable by users during sign-up
      },
    },
  },

  // Trusted origins for CSRF protection
  trustedOrigins: [env.BETTER_AUTH_URL],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
