import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "src/tests",

  // Reporter to use
  reporter: "html",

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: "http://localhost:4321",

    // Collect trace when retrying the failed test.
    trace: "on-first-retry",
  },
  // Run your local dev server before starting the tests.
  webServer: {
    command: "npm run start",
    url: "http://localhost:4321",
  },
});
