import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-helpers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateProfileForm } from "@/components/auth/update-profile-form";
import { ChangePasswordForm } from "@/components/auth/change-password-form";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const user = await requireAuth();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your account settings</p>
      </div>

      <Card id="profile">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your name and email address</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateProfileForm user={{ name: user.name, email: user.email }} />
        </CardContent>
      </Card>

      <Card id="password">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
