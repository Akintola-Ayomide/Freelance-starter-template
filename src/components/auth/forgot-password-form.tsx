"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { requestPasswordReset } from "@/lib/auth-client";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ForgotPasswordForm() {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setServerError(null);

    const result = await requestPasswordReset({
      email: data.email,
      redirectTo: "/reset-password",
    });

    if (result.error) {
      // Don't reveal if the email exists — always show success
      console.error("[forgot-password]", result.error);
    }

    // Always show success to prevent email enumeration
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <Alert variant="success">
        <AlertDescription>
          If an account exists for that email, we&apos;ve sent a password reset link. Check your
          inbox (and spam folder).
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {serverError && (
        <Alert variant="destructive">
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <FormField label="Email" htmlFor="email" error={errors.email?.message} required>
        <Input
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email")}
        />
      </FormField>

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Send Reset Link
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Remembered your password?{" "}
        <Link href="/sign-in" className="font-medium text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
