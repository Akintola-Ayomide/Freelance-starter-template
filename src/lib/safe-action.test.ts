import { describe, it, expect } from "vitest";
import { z } from "zod";
import { safeAction, isActionSuccess, isActionError } from "./safe-action";

const testSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  score: z.number().int().positive("Score must be positive"),
});

describe("safeAction helper", () => {
  it("executes handler successfully when input is valid", async () => {
    const action = safeAction(testSchema, async (data) => {
      return { id: "test-id", uppercaseTitle: data.title.toUpperCase() };
    });

    const result = await action({ title: "Freelance", score: 10 });

    expect(isActionSuccess(result)).toBe(true);
    if (isActionSuccess(result)) {
      expect(result.data.uppercaseTitle).toBe("FREELANCE");
      expect(result.data.id).toBe("test-id");
    }
  });

  it("returns formatted errors when input validation fails", async () => {
    const action = safeAction(testSchema, async () => {
      return { ok: true };
    });

    const result = await action({ title: "ab", score: -5 });

    expect(isActionError(result)).toBe(true);
    if (isActionError(result)) {
      expect(result.errors.title).toBeDefined();
      expect(result.errors.title[0]).toContain("at least 3 characters");
      expect(result.errors.score).toBeDefined();
      expect(result.errors.score[0]).toContain("positive");
    }
  });

  it("catches thrown exceptions and returns error result", async () => {
    const action = safeAction(testSchema, async () => {
      throw new Error("Database connection dropped");
    });

    const result = await action({ title: "Valid Title", score: 5 });

    expect(isActionError(result)).toBe(true);
    if (isActionError(result)) {
      expect(result.message).toBe("Database connection dropped");
      expect(result.errors._form).toBeDefined();
    }
  });
});
