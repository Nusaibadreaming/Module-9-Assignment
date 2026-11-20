class ProductCartCheckoutPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.locator('input.search-box-button');
    this.cartLink = page.locator('#topcartlink a');
    this.qtyInput = page.locator('input.qty-input');
    this.addToCartButton = page.locator('input[id^="add-to-cart-button-"]');
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');

    // Billing Address fields
    this.billingCountry = page.locator('#BillingNewAddress_CountryId');
    this.billingState = page.locator('#BillingNewAddress_StateProvinceId');
    this.billingCity = page.locator('#BillingNewAddress_City');
    this.billingAddress1 = page.locator('#BillingNewAddress_Address1');
    this.billingZip = page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingPhone = page.locator('#BillingNewAddress_PhoneNumber');

    // Checkout step buttons
    this.billingContinue = page.locator('#billing-buttons-container input[type="button"]');
    this.shippingContinue = page.locator('#shipping-buttons-container input[type="button"]');
    this.shippingMethodContinue = page.locator('#shipping-method-buttons-container input[type="button"]');
    this.paymentMethodContinue = page.locator('#payment-method-buttons-container input[type="button"]');
    this.paymentInfoContinue = page.locator('#payment-info-buttons-container input[type="button"]');
    this.confirmOrderButton = page.locator('#confirm-order-buttons-container input[type="button"]');

    this.orderConfirmedHeading = page.locator('.order-completed .title');
    this.orderDetailsLink = page.locator('.order-completed .details a');
  }

  async openCategory(categoryPath) {
    await this.page.goto(categoryPath);
  }

  async searchProduct(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  async openProductByTitle(title) {
    await this.page.locator('.product-title a', { hasText: title }).first().click();
  }

  async setQuantityAndAddToCart(qty) {
    await this.qtyInput.fill(String(qty));
    await this.addToCartButton.first().click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async fillBillingAddressIfNeeded() {
    if (await this.billingCountry.isVisible()) {
      const currentCountry = await this.billingCountry.inputValue();
      if (!currentCountry || currentCountry === '0') {
        await this.billingCountry.selectOption({ label: 'United States' });
        await this.page.waitForTimeout(1000);
      }

      if (await this.billingState.isVisible()) {
        const optionsCount = await this.billingState.locator('option').count();
        if (optionsCount > 1) {
          const currentState = await this.billingState.inputValue();
          if (!currentState || currentState === '0') {
            await this.billingState.selectOption({ index: 1 });
          }
        }
      }
    }

    if (await this.billingCity.isVisible() && !(await this.billingCity.inputValue())) {
      await this.billingCity.fill('Dhaka');
    }
    if (await this.billingAddress1.isVisible() && !(await this.billingAddress1.inputValue())) {
      await this.billingAddress1.fill('House 12, Road 5, Dhanmondi');
    }
    if (await this.billingZip.isVisible() && !(await this.billingZip.inputValue())) {
      await this.billingZip.fill('1209');
    }
    if (await this.billingPhone.isVisible() && !(await this.billingPhone.inputValue())) {
      await this.billingPhone.fill('01711000000');
    }
  }

  async clickStepIfVisible(buttonLocator, timeout = 10000) {
    try {
      const btn = buttonLocator.first();
      await btn.waitFor({ state: 'visible', timeout });
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      return true;
    } catch {
      return false;
    }
  }

  async completeCheckoutIfNeeded() {
    await this.termsCheckbox.check();
    await this.checkoutButton.click();

    await this.fillBillingAddressIfNeeded();
    await this.clickStepIfVisible(this.billingContinue, 12000);
    await this.clickStepIfVisible(this.shippingContinue, 10000);
    await this.clickStepIfVisible(this.shippingMethodContinue, 10000);
    await this.clickStepIfVisible(this.paymentMethodContinue, 10000);
    await this.clickStepIfVisible(this.paymentInfoContinue, 10000);

    // Step 6: Confirm Order
    await this.confirmOrderButton.first().waitFor({ state: 'visible', timeout: 20000 });
    await this.confirmOrderButton.first().scrollIntoViewIfNeeded();
    await this.confirmOrderButton.first().click();

    // অর্ডার সম্পন্ন হওয়ার হেডিং বা ডিটেইলস লিংক আসা পর্যন্ত অপেক্ষা
    await this.orderConfirmedHeading.waitFor({ state: 'visible', timeout: 20000 });
  }
}

module.exports = { ProductCartCheckoutPage };