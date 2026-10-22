/**
 * Site configuration — the single source of truth for app metadata.
 *
 * When starting a new client project:
 * 1. Run `pnpm init:project` to update this file automatically, OR
 * 2. Edit the values below manually.
 *
 * These values are used across: metadata, emails, OG tags, footer, etc.
 */

export const siteConfig = {
  /** App name — used in title tags, emails, and UI */
  name: "Freelancer Starter",

  /** Short tagline — used in meta description and OG tags */
  description: "A production-ready Next.js starter for freelancers. Clone, rebrand, and ship.",

  /** Canonical production URL (no trailing slash) */
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  /** Support / contact email shown in emails and footer */
  supportEmail: "support@example.com",

  /** Default OG image path (relative to /public) */
  ogImage: "/og-image.png",

  /** Social links — set to null to hide */
  links: {
    github: "https://github.com/your-org/your-repo",
    twitter: null as string | null,
    linkedin: null as string | null,
  },

  /** Navigation items for the main nav */
  nav: {
    main: [
      { label: "Features", href: "/#features" },
      { label: "Sign In", href: "/sign-in" },
      { label: "Sign Up", href: "/sign-up" },
    ],
    auth: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings", href: "/settings" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
