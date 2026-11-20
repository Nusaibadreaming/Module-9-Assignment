class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.locator('a.ico-login');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('input.login-button');
    this.validationError = page.locator('.validation-summary-errors');
    this.logoutLink = page.locator('a.ico-logout');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };