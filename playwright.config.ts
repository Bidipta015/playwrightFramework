import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'src/tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit/results.xml' }]
  ],
  use: {
    actionTimeout: 0,
    navigationTimeout: 30 * 1000,
    baseURL: 'https://theleadingyounth.com',
    trace: 'on-first-retry',
    // Capture helpful artifacts on failures
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Store Playwright test artifacts under test-results
    outputDir: 'test-results'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
};

export default config;
