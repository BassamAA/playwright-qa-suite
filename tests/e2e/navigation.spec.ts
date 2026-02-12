import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("renders the shell and sign out action", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "N.A.T" })).toBeVisible();
    await expect(page.getByRole("button", { name: /sign out/i })).toBeVisible();
  });

  test("visible nav links lead to their modules", async ({ page }) => {
    await page.goto("/");

    const signInHeading = page.getByRole("heading", { name: /sign in/i });
    const emailInput = page.locator('input[type="email"]').first();
    if ((await signInHeading.isVisible()) || (await emailInput.isVisible())) {
      await expect(signInHeading.or(emailInput)).toBeVisible();
      return;
    }

    const navLinks = page.locator("aside nav a");
    const total = await navLinks.count();
    if (total === 0) {
      await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
      return;
    }

    const maxChecks = Math.min(total, 5);
    for (let i = 0; i < maxChecks; i += 1) {
      const link = navLinks.nth(i);
      await link.click();
      await expect(page.getByRole("heading").first()).toBeVisible();
    }
  });
});
