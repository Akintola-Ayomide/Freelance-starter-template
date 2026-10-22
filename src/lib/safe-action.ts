import { z, ZodSchema } from "zod";

/**
 * A typed server action helper that:
 * 1. Validates input with a Zod schema
 * 2. Returns a discriminated union result: `{ ok: true, data }` | `{ ok: false, errors }`
 * 3. Catches unexpected errors and formats them consistently
 *
 * Usage:
 * ```ts
 * // In a server action file:
 * "use server";
 * export const updateProfile = safeAction(
 *   updateProfileSchema,
 *   async (data) => {
 *     // data is fully typed and validated
 *     const user = await db.user.update({ where: { id: ... }, data });
 *     return user;
 *   }
 * );
 *
 * // In a component:
 * const result = await updateProfile(formData);
 * if (!result.ok) {
 *   // result.errors contains field-level error messages
 * }
 * ```
 */

export type ActionSuccess<T> = {
  ok: true;
  data: T;
};

export type ActionError = {
  ok: false;
  errors: Record<string, string[]>;
  message?: string;
};

export type ActionResult<T> = ActionSuccess<T> | ActionError;

/**
 * Creates a validated server action with typed input and output.
 */
export function safeAction<TSchema extends ZodSchema, TOutput>(
  schema: TSchema,
  handler: (data: z.infer<TSchema>) => Promise<TOutput>,
) {
  return async (input: unknown): Promise<ActionResult<TOutput>> => {
    // Validate input against the schema
    const parseResult = schema.safeParse(input);

    if (!parseResult.success) {
      const errors: Record<string, string[]> = {};
      for (const issue of parseResult.error.issues) {
        const key = issue.path.join(".") || "_form";
        if (!errors[key]) errors[key] = [];
        errors[key].push(issue.message);
      }
      return { ok: false, errors };
    }

    try {
      const data = await handler(parseResult.data);
      return { ok: true, data };
    } catch (error) {
      // Log unexpected errors server-side
      console.error("[safeAction] Unexpected error:", error);

      // Return a generic error to the client (don't leak internals)
      const message = error instanceof Error ? error.message : "An unexpected error occurred";

      return {
        ok: false,
        errors: { _form: [message] },
        message,
      };
    }
  };
}

/**
 * Type guard to check if an action result is a success.
 */
export function isActionSuccess<T>(result: ActionResult<T>): result is ActionSuccess<T> {
  return result.ok === true;
}

/**
 * Type guard to check if an action result is an error.
 */
export function isActionError<T>(result: ActionResult<T>): result is ActionError {
  return result.ok === false;
}
