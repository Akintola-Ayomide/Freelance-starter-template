"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[error boundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Something went wrong</h1>
        <p className="max-w-md text-muted-foreground">
          An unexpected error occurred. Please try again, or contact support if the problem
          persists.
        </p>
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 max-w-lg overflow-auto rounded-lg bg-muted p-4 text-left text-xs">
            {error.message}
          </pre>
        )}
      </div>
      <div className="flex gap-3">
        <Button onClick={reset}>Try Again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Go Home
        </Button>
      </div>
    </div>
  );
}
