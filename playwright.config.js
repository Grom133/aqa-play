// @ts-check
import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';
import { AUTH } from './tests/auth';

const requiredEnvVariables = [
  'QAUTO1_BASE_URL',
  'QAUTO2_BASE_URL',
  'HTTP_CREDENTIALS_USERNAME',
  'HTTP_CREDENTIALS_PASSWORD',
  'QAUTO1_API_USER_EMAIL',
  'QAUTO1_API_USER_PASSWORD',
  'QAUTO2_API_USER_EMAIL',
  'QAUTO2_API_USER_PASSWORD',
];

for (const variableName of requiredEnvVariables) {
  if (!process.env[variableName]) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
}

const BASE_URLS = {
  qauto1: process.env.QAUTO1_BASE_URL,
  qauto2: process.env.QAUTO2_BASE_URL,
};

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
  },

  /* Run tests only in Google Chrome against both environments */
  projects: [
    {
      name: 'setup-qauto1',
      testMatch: /auth\.setup\.js/,
      use: {
        baseURL: BASE_URLS.qauto1,
        httpCredentials: AUTH.qauto1,
      },
    },
    {
      name: 'setup-qauto2',
      testMatch: /auth\.setup\.js/,
      use: {
        baseURL: BASE_URLS.qauto2,
        httpCredentials: AUTH.qauto2,
      },
    },
    {
      name: 'chrome-qauto1',
      testIgnore: [
        /auth\.setup\.js/,
        /\.qauto1\.spec\.js$/,
        /\.qauto2\.spec\.js$/,
      ],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        baseURL: BASE_URLS.qauto1,
        httpCredentials: AUTH.qauto1,
      },
    },
    {
      name: 'chrome-qauto2',
      testIgnore: [
        /auth\.setup\.js/,
        /\.qauto1\.spec\.js$/,
        /\.qauto2\.spec\.js$/,
      ],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        baseURL: BASE_URLS.qauto2,
        httpCredentials: AUTH.qauto2,
      },
    },
    {
      name: 'auth-chrome-qauto1',
      testMatch: /\.qauto1\.spec\.js$/,
      testIgnore: [
        /carCreationAPI\.qauto1\.spec\.js$/,
        /negativeCarCreationAPI\.qauto1\.spec\.js$/,
        /notLoggedCarCreationAPI\.qauto1\.spec\.js$/,
      ],
      dependencies: ['setup-qauto1'],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        baseURL: BASE_URLS.qauto1,
        httpCredentials: AUTH.qauto1,
      },
    },
    {
      name: 'auth-chrome-qauto2',
      testMatch: /\.qauto2\.spec\.js$/,
      testIgnore: [
        /carCreationAPI\.qauto2\.spec\.js$/,
        /negativeCarCreationAPI\.qauto2\.spec\.js$/,
        /notLoggedCarCreationAPI\.qauto2\.spec\.js$/,
      ],
      dependencies: ['setup-qauto2'],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        baseURL: BASE_URLS.qauto2,
        httpCredentials: AUTH.qauto2,
      },
    },
    {
      name: 'api-qauto1',
      testMatch: /(?:carCreationAPI|negativeCarCreationAPI|notLoggedCarCreationAPI)\.qauto1\.spec\.js$/,
      use: {
        baseURL: BASE_URLS.qauto1,
        httpCredentials: AUTH.qauto1,
      },
    },
    {
      name: 'api-qauto2',
      testMatch: /(?:carCreationAPI|negativeCarCreationAPI|notLoggedCarCreationAPI)\.qauto2\.spec\.js$/,
      use: {
        baseURL: BASE_URLS.qauto2,
        httpCredentials: AUTH.qauto2,
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
