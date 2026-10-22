import { describe, it, expect } from "vitest";
import { signUpSchema, signInSchema, forgotPasswordSchema, resetPasswordSchema } from "./auth";

describe("Auth Validation Schemas", () => {
  describe("signUpSchema", () => {
    it("validates valid sign up input", () => {
      const result = signUpSchema.safeParse({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "ValidPassword123!",
        confirmPassword: "ValidPassword123!",
      });

      expect(result.success).toBe(true);
    });

    it("rejects mismatched passwords", () => {
      const result = signUpSchema.safeParse({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "ValidPassword123!",
        confirmPassword: "DifferentPassword123!",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("Passwords do not match");
      }
    });

    it("rejects weak password lacking uppercase or number", () => {
      const result = signUpSchema.safeParse({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "weakpassword",
        confirmPassword: "weakpassword",
      });

      expect(result.success).toBe(false);
    });

    it("rejects invalid email format", () => {
      const result = signUpSchema.safeParse({
        name: "Jane Doe",
        email: "not-an-email",
        password: "ValidPassword123!",
        confirmPassword: "ValidPassword123!",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("signInSchema", () => {
    it("validates valid sign in input", () => {
      const result = signInSchema.safeParse({
        email: "user@example.com",
        password: "mypassword",
      });

      expect(result.success).toBe(true);
    });

    it("rejects missing password", () => {
      const result = signInSchema.safeParse({
        email: "user@example.com",
        password: "",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("forgotPasswordSchema", () => {
    it("validates valid email", () => {
      const result = forgotPasswordSchema.safeParse({
        email: "user@example.com",
      });

      expect(result.success).toBe(true);
    });

    it("rejects invalid email", () => {
      const result = forgotPasswordSchema.safeParse({
        email: "invalid-email",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("resetPasswordSchema", () => {
    it("validates matching valid password and token", () => {
      const result = resetPasswordSchema.safeParse({
        password: "NewPassword123!",
        confirmPassword: "NewPassword123!",
        token: "sample-token-abc",
      });

      expect(result.success).toBe(true);
    });

    it("fails when token is missing", () => {
      const result = resetPasswordSchema.safeParse({
        password: "NewPassword123!",
        confirmPassword: "NewPassword123!",
        token: "",
      });

      expect(result.success).toBe(false);
    });
  });
});
