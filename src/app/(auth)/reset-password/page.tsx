import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordPage() {
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
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="h-32 animate-pulse rounded bg-muted" />}>
            <ResetPasswordForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
