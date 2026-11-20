const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 0,
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    baseURL: 'https://demowebshop.tricentis.com',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  }
});