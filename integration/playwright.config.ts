import type { PlaywrightTestConfig } from "@playwright/test";
// import { devices } from "@playwright/test";
const { devices } = require("@replayio/playwright");

const config: PlaywrightTestConfig = {
  testDir: ".",

  testMatch: ["**/*-test.ts"],
  /* Maximum time one test can run for. */
  timeout: 30_000,
  expect: {
    /* Maximum time expect() should wait for the condition to be met. */
    timeout: 5_000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : [["html", { open: "never" }]],
  use: { actionTimeout: 0,  headless: true },

  projects: [
    {
      name: "replay-firefox",
      use: {
        ...devices["Replay Firefox"],
      },
    },
  ],
};

export default config;
