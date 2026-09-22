import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests", testMatch: "e2e.spec.ts", fullyParallel: false, workers: 1,
  timeout: 120_000, expect: { timeout: 15_000 },
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:4173", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }, { name: "webkit", use: { browserName: "webkit" } }],
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : { command: "node scripts/serve.mjs", url: "http://127.0.0.1:4173", reuseExistingServer: !process.env.CI, timeout: 30_000 },
});
