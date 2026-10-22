import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-helpers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await requireAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Welcome back, {user.name}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* User info card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Name
              </p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Email
              </p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Role
              </p>
              <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold">
                {user.role ?? "user"}
              </span>
            </div>
            <Button variant="outline" size="sm" asChild className="mt-2 w-full">
              <Link href="/settings">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Links</CardTitle>
            <CardDescription>Common actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" size="sm" asChild className="w-full justify-start">
              <Link href="/settings">⚙️ Account Settings</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="w-full justify-start">
              <Link href="/settings#password">🔒 Change Password</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Getting started card */}
        <Card className="border-brand/20 bg-brand/5">
          <CardHeader>
            <CardTitle className="text-base text-brand">Getting Started</CardTitle>
            <CardDescription>
              This is your starter dashboard. Replace this with your app&apos;s content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>✅ Auth is wired up</p>
            <p>✅ Database is connected</p>
            <p>✅ Email is ready</p>
            <p>
              🎨 Customize in{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">src/config/site.ts</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
