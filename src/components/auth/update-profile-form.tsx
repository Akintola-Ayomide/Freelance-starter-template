"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { updateProfileSchema, type UpdateProfileInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UpdateProfileFormProps {
  user: {
    name: string;
    email: string;
  };
}

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    setServerError(null);
    setIsSuccess(false);

    const result = await authClient.updateUser({
      name: data.name,
    });

    if (result.error) {
      setServerError(result.error.message ?? "Failed to update profile. Please try again.");
      return;
    }

    setIsSuccess(true);
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
          <AlertDescription>Profile updated successfully!</AlertDescription>
        </Alert>
      )}

      <FormField label="Name" htmlFor="name" error={errors.name?.message} required>
        <Input type="text" autoComplete="name" {...register("name")} />
      </FormField>

      <FormField
        label="Email"
        htmlFor="email"
        error={errors.email?.message}
        hint="Email changes require re-verification"
        required
      >
        <Input type="email" autoComplete="email" disabled {...register("email")} />
      </FormField>

      <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
        Save Changes
      </Button>
    </form>
  );
}
