import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { VerifyEmailContent } from "@/components/auth/verify-email-content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default function VerifyEmailPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight transition-opacity hover:opacity-90"
        >
          {siteConfig.name}
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>Verifying your email address…</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="h-16 animate-pulse rounded bg-muted" />}>
            <VerifyEmailContent />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
