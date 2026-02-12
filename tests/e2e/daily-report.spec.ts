import { test, expect } from "@playwright/test";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

test.describe("Daily report", () => {
  test("loads and downloads PDF", async ({ page }) => {
    await page.goto("/daily-report");
    await expect(page.getByRole("heading", { name: /daily report/i })).toBeVisible();

    // Ensure date input has a value
    const dateInput = page.getByLabel(/date/i).or(page.locator('input[type="date"]'));
    await expect(dateInput).toBeVisible();
    const current = await dateInput.first().inputValue();
    if (!current) {
      const today = new Date().toISOString().slice(0, 10);
      await dateInput.first().fill(today);
    }

    await page.getByRole("button", { name: /load report/i }).click();
    await expect(page.getByText(/receipts total/i)).toBeVisible({ timeout: 15000 });

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: /download pdf/i }).click(),
    ]);
    const filePath = join(tmpdir(), `daily-report-${Date.now()}.pdf`);
    await download.saveAs(filePath);
    const size = (await stat(filePath)).size;
    expect(size).toBeGreaterThan(0);
  });
});
