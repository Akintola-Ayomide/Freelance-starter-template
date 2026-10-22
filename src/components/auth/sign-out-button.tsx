"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
    setIsLoading(false);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleSignOut} isLoading={isLoading}>
      Sign Out
    </Button>
  );
}
