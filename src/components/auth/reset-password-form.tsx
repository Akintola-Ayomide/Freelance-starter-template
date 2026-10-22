"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "@/lib/auth-client";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  });

  if (!token) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Invalid or missing reset token.{" "}
          <Link href="/forgot-password" className="font-medium underline">
            Request a new link
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  const onSubmit = async (data: ResetPasswordInput) => {
    setServerError(null);

    const result = await resetPassword({
      newPassword: data.password,
      token: data.token,
    });

    if (result.error) {
      setServerError(
        result.error.message ?? "Failed to reset password. The link may have expired.",
      );
      return;
    }

    setIsSuccess(true);
    setTimeout(() => router.push("/sign-in"), 2000);
  };

  if (isSuccess) {
    return (
      <Alert variant="success">
        <AlertDescription>Password reset successfully! Redirecting to sign in…</AlertDescription>
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

      <input type="hidden" {...register("token")} />

      <FormField
        label="New Password"
        htmlFor="password"
        error={errors.password?.message}
        hint="At least 8 characters with uppercase, lowercase, and a number"
        required
      >
        <Input
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          {...register("password")}
        />
      </FormField>

      <FormField
        label="Confirm New Password"
        htmlFor="confirmPassword"
        error={errors.confirmPassword?.message}
        required
      >
        <Input
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          {...register("confirmPassword")}
        />
      </FormField>

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Reset Password
      </Button>
    </form>
  );
}
