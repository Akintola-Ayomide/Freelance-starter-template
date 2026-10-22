import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * A form field wrapper that combines a Label, input slot, error message, and hint text.
 * Handles aria attributes for accessibility.
 */
export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: FormFieldProps) {
  const errorId = error ? `${htmlFor}-error` : undefined;
  const hintId = hint ? `${htmlFor}-hint` : undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {required && (
          <span className="ml-1 text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </Label>

      {/* Clone children to inject aria-describedby and aria-invalid */}
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          id: htmlFor,
          "aria-describedby": [errorId, hintId].filter(Boolean).join(" ") || undefined,
          "aria-invalid": error ? "true" : undefined,
          "aria-required": required ? "true" : undefined,
        });
      })}

      {hint && !error && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-destructive"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
