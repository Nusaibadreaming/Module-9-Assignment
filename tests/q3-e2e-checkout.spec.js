const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { ProductCartCheckoutPage } = require('../pages/ProductCartCheckoutPage');

test('Q3 - E2E Search, update quantity, add to cart, checkout and order details', async ({ page }, testInfo) => {
  const registerPage = new RegisterPage(page);
  const shopPage = new ProductCartCheckoutPage(page);

  const uniqueEmail = `e2e_${Date.now()}@example.com`;
  await registerPage.goto();
  await registerPage.registerUser({
    firstName: 'E2E',
    lastName: 'Buyer',
    email: uniqueEmail,
    password: 'Password@123'
  });
  await expect(registerPage.logoutLink).toBeVisible();

  await shopPage.searchProduct('Computing and Internet');
  await expect(page.locator('.product-title a', { hasText: 'Computing and Internet' }).first()).toBeVisible();

  await shopPage.openProductByTitle('Computing and Internet');
  await shopPage.setQuantityAndAddToCart(2);

  await shopPage.openCart();
  await expect(page.locator('.cart-item-row input.qty-input')).toHaveValue('2');

  await shopPage.completeCheckoutIfNeeded();
  await expect(shopPage.orderConfirmedHeading).toContainText('Your order has been successfully processed!');
  await shopPage.orderDetailsLink.click();
  await expect(page).toHaveURL(/\/orderdetails\//);

  const screenshot = await page.screenshot();
  await testInfo.attach('q3-order-details', {
    body: screenshot,
    contentType: 'image/png'
  });
});