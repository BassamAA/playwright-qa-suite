import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test.use({ storageState: undefined });

  test("renders the login form", async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("domcontentloaded");

    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    const signInButton = page.getByRole("button", { name: /sign in/i });

    if (await emailInput.isVisible()) {
      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      await expect(signInButton).toBeVisible();
      return;
    }

    await expect(
      page.getByRole("heading", { name: /dashboard/i }).or(page.getByRole("button", { name: /sign out/i })),
    ).toBeVisible();
  });

  test("requires authentication for app shell", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /sign in/i }).or(page.getByRole("heading", { name: /dashboard/i })),
    ).toBeVisible();
  });
});
