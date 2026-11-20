const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Q1 - Invalid Login verification', async ({ page }, testInfo) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('invalid_user@example.com', 'WrongPassword123');

  await expect(loginPage.validationError).toBeVisible();
  await expect(loginPage.validationError).toContainText('Login was unsuccessful');
  await expect(loginPage.logoutLink).toHaveCount(0);

  const screenshot = await page.screenshot();
  await testInfo.attach('q1-invalid-login-result', {
    body: screenshot,
    contentType: 'image/png'
  });
});