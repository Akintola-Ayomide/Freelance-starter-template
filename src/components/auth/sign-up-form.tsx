"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import { signUpSchema, type SignUpInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SignUpForm() {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpInput) => {
    setServerError(null);

    const result = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard",
    });

    if (result.error) {
      setServerError(result.error.message ?? "Registration failed. Please try again.");
      return;
    }

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <Alert variant="success">
        <AlertDescription>
          <strong>Check your email!</strong> We&apos;ve sent a verification link to your inbox.
          Please verify your email to complete sign up.
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

      <FormField label="Name" htmlFor="name" error={errors.name?.message} required>
        <Input type="text" autoComplete="name" placeholder="Jane Smith" {...register("name")} />
      </FormField>

      <FormField label="Email" htmlFor="email" error={errors.email?.message} required>
        <Input
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email")}
        />
      </FormField>

      <FormField
        label="Password"
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
        label="Confirm Password"
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
        Create Account
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
