import { test, expect } from "@playwright/test";

test.describe("Smoke Test — Auth & Dashboard", () => {
  test("landing page renders successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Freelancer Starter/i);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /sign in/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /get started/i }).first()).toBeVisible();
  });

  test("protected dashboard redirects unauthenticated visitor to sign-in", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test("sign-in page shows form with email and password inputs", async ({ page }) => {
    await page.goto("/sign-in");
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("sign-up page enforces validation", async ({ page }) => {
    await page.goto("/sign-up");
    await page.getByRole("button", { name: /create account/i }).click();
    await expect(
      page.getByText(/email is required/i).or(page.getByText(/name must be/i)),
    ).toBeVisible();
  });
});
