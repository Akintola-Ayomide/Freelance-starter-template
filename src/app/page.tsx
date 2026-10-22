import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

const features = [
  {
    icon: "🔐",
    title: "Authentication",
    description:
      "Email/password + Google OAuth. Email verification, password reset, and session management via Better Auth.",
  },
  {
    icon: "🗄️",
    title: "Database + ORM",
    description:
      "PostgreSQL with Prisma ORM. Migrations committed, singleton client, seed scripts included.",
  },
  {
    icon: "📧",
    title: "Transactional Email",
    description:
      "React Email templates for verify, reset, and welcome. Resend integration with console fallback for dev.",
  },
  {
    icon: "✅",
    title: "Zod Validation",
    description:
      "End-to-end type-safe validation. Schemas shared between client forms and server actions.",
  },
  {
    icon: "🎨",
    title: "Design System",
    description:
      "Tailwind with CSS variable tokens. Rebrand in one file. Dark mode, accessible, responsive.",
  },
  {
    icon: "🚀",
    title: "Production Ready",
    description:
      "Security headers, rate limiting, health check, Docker support, CI/CD with GitHub Actions.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight transition-opacity hover:opacity-90"
          >
            {siteConfig.name}
          </Link>
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="container mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
              Production-ready from day one
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Ship client projects <span className="text-brand">faster than ever</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
              {siteConfig.description}. Full auth, email, database, and CI/CD — all wired up and
              ready to go. Just clone, rebrand, and ship.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/sign-up">Start for Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-border bg-muted/40">
          <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Everything you need</h2>
              <p className="mt-3 text-muted-foreground">
                Pre-configured, tested, and ready for production.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-lg border border-border bg-card p-6 shadow-sm"
                >
                  <div className="mb-3 text-2xl">{feature.icon}</div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Built with the Freelancer Starter.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/sign-in" className="transition-colors hover:text-foreground">
              Sign In
            </Link>
            <Link href="/sign-up" className="transition-colors hover:text-foreground">
              Sign Up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
