import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const rawBaseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const baseURL = rawBaseUrl.startsWith("http") ? rawBaseUrl : `https://${rawBaseUrl}`;

const enableWebkit =
  process.env.PW_WEBKIT === "true" ||
  process.env.PW_BROWSER === "webkit" ||
  process.env.CI;
const enableHtmlReport = process.env.PW_HTML === "true" || process.env.CI;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 90_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  use: {
    baseURL,
    trace: "on-first-retry",
    storageState: "playwright/.auth/storageState.json",
    headless: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    ...(enableWebkit
      ? [
          {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
          },
        ]
      : []),
  ],
  globalSetup: "./tests/e2e/global-setup.ts",
  reporter: enableHtmlReport
    ? [["list"], ["html", { outputFolder: "playwright-report" }]]
    : "list",
});
