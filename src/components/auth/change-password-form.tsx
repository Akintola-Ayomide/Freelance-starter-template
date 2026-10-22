"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { changePasswordSchema, type ChangePasswordInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ChangePasswordForm() {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordInput) => {
    setServerError(null);
    setIsSuccess(false);

    const result = await authClient.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: true,
    });

    if (result.error) {
      setServerError(result.error.message ?? "Failed to change password. Please try again.");
      return;
    }

    setIsSuccess(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {serverError && (
        <Alert variant="destructive">
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      {isSuccess && (
        <Alert variant="success">
          <AlertDescription>
            Password changed successfully! All other sessions have been revoked.
          </AlertDescription>
        </Alert>
      )}

      <FormField
        label="Current Password"
        htmlFor="currentPassword"
        error={errors.currentPassword?.message}
        required
      >
        <Input
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          {...register("currentPassword")}
        />
      </FormField>

      <FormField
        label="New Password"
        htmlFor="newPassword"
        error={errors.newPassword?.message}
        hint="At least 8 characters with uppercase, lowercase, and a number"
        required
      >
        <Input
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          {...register("newPassword")}
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

      <Button type="submit" isLoading={isSubmitting}>
        Change Password
      </Button>
    </form>
  );
}
