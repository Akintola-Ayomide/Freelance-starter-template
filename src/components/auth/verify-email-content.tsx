"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { verifyEmail } from "@/lib/auth-client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = React.useState<"pending" | "success" | "error">("pending");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  React.useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("No verification token found. Check your email for the verification link.");
      return;
    }

    verifyEmail({ query: { token } })
      .then((result) => {
        if (result.error) {
          setStatus("error");
          setErrorMessage(
            result.error.message ?? "Verification failed. The link may have expired.",
          );
        } else {
          setStatus("success");
          setTimeout(() => router.push("/dashboard"), 2000);
        }
      })
      .catch(() => {
        setStatus("error");
        setErrorMessage("An unexpected error occurred. Please try again.");
      });
  }, [token, router]);

  if (status === "pending") {
    return (
      <div className="flex items-center gap-3 text-muted-foreground">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-brand" />
        <span>Verifying your email…</span>
      </div>
    );
  }

  if (status === "success") {
    return (
      <Alert variant="success">
        <AlertDescription>
          ✅ Email verified successfully! Redirecting to your dashboard…
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
      <Button asChild variant="outline" className="w-full">
        <Link href="/sign-in">Go to Sign In</Link>
      </Button>
    </div>
  );
}
