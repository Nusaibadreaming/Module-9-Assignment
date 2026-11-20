const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { ProductCartCheckoutPage } = require('../pages/ProductCartCheckoutPage');

test('Q2 - Register new user and add product to cart', async ({ page }, testInfo) => {
  const registerPage = new RegisterPage(page);
  const shopPage = new ProductCartCheckoutPage(page);

  const uniqueEmail = `testuser_${Date.now()}@example.com`;
  await registerPage.goto();
  await registerPage.registerUser({
    firstName: 'Test',
    lastName: 'User',
    email: uniqueEmail,
    password: 'Password@123'
  });

  await expect(registerPage.registerSuccessMsg).toContainText('Your registration completed');
  await expect(registerPage.logoutLink).toBeVisible();

  await shopPage.openCategory('/books');
  await shopPage.openProductByTitle('Computing and Internet');
  await shopPage.addToCartButton.first().click();

  await shopPage.openCart();
  const cartProduct = page.locator('.cart-item-row .product-name');
  const cartQty = page.locator('.cart-item-row input.qty-input');

  await expect(cartProduct).toContainText('Computing and Internet');
  await expect(cartQty).toHaveValue('1');

  const screenshot = await page.screenshot();
  await testInfo.attach('q2-cart-verification', {
    body: screenshot,
    contentType: 'image/png'
  });
});