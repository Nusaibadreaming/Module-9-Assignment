class RegisterPage {
  constructor(page) {
    this.page = page;
    this.registerLink = page.locator('a.ico-register');
    this.genderMale = page.locator('#gender-male');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.registerSuccessMsg = page.locator('.result');
    this.logoutLink = page.locator('a.ico-logout');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async registerUser({ firstName, lastName, email, password }) {
    await this.genderMale.check();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.registerButton.click();
  }
}

module.exports = { RegisterPage };