import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sign Up",
  description: `Create your ${siteConfig.name} account`,
};

export default function SignUpPage() {
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
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Get started with {siteConfig.name} for free</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
