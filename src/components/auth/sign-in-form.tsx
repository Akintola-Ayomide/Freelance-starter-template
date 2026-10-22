"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { signInSchema, type SignInInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SignInForm() {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInInput) => {
    setServerError(null);

    const result = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      callbackURL: "/dashboard",
    });

    if (result.error) {
      setServerError(result.error.message ?? "Invalid email or password. Please try again.");
      return;
    }

    setIsSuccess(true);
    router.push("/dashboard");
    router.refresh();
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
          <AlertDescription>Sign in successful! Redirecting…</AlertDescription>
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

      <FormField label="Password" htmlFor="password" error={errors.password?.message} required>
        <Input
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          {...register("password")}
        />
      </FormField>

      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" className="rounded border-input" {...register("rememberMe")} />
          Remember me
        </label>
        <Link
          href="/forgot-password"
          className="rounded text-sm text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Sign In
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-medium text-brand hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
