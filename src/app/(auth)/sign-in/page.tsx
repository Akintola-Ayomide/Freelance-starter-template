import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SignInForm } from "@/components/auth/sign-in-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sign In",
  description: `Sign in to your ${siteConfig.name} account`,
};

export default function SignInPage() {
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
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
