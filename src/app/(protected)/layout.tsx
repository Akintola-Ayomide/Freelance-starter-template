import { requireAuth } from "@/lib/auth-helpers";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link
            href="/dashboard"
            className="text-xl font-bold tracking-tight transition-opacity hover:opacity-90"
          >
            {siteConfig.name}
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/settings"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Settings
            </Link>
            <ThemeToggle />
            <SignOutButton />
          </nav>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl flex-1 px-4 py-8">{children}</main>
    </div>
  );
}
