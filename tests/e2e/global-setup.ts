import { chromium, type FullConfig, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const rawFrontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const frontendUrl = rawFrontendUrl.startsWith("http") ? rawFrontendUrl : `https://${rawFrontendUrl}`;
const userEmail = process.env.E2E_EMAIL;
const userPassword = process.env.E2E_PASSWORD;

export default async function globalSetup(_config: FullConfig) {
  if (!userEmail || !userPassword) {
    throw new Error("Set E2E_EMAIL and E2E_PASSWORD env vars for Playwright login.");
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`${frontendUrl}/login`, { waitUntil: "domcontentloaded" });

  const emailInput = page.locator('input[type="email"]').first();
  const passwordInput = page.locator('input[type="password"]').first();

  if (!(await emailInput.isVisible())) {
    await page.goto(frontendUrl, { waitUntil: "domcontentloaded" });
  }

  await expect(emailInput, "Login email input not found. Check FRONTEND_URL.").toBeVisible({
    timeout: 15000,
  });
  await expect(passwordInput, "Login password input not found.").toBeVisible();

  await emailInput.fill(userEmail);
  await passwordInput.fill(userPassword);
  await Promise.all([
    page.waitForLoadState("networkidle"),
    page.getByRole("button", { name: /sign in/i }).click(),
  ]);

  await expect(
    page.getByRole("button", { name: /sign out/i }).or(page.getByRole("heading", { name: /dashboard/i })),
  ).toBeVisible({ timeout: 20000 });

  await page.context().storageState({ path: "playwright/.auth/storageState.json" });
  await browser.close();
}
