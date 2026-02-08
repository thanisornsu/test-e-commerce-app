import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly errorMessage: Locator;
  readonly loggedInUser: Locator;

  constructor(page: Page) {
    super(page);
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.errorMessage = page.locator('p[style*="color: red"]');
    this.loggedInUser = page.locator('a:has-text("Logged in as"), a:has-text("Logout")').first();
  }

  async navigateToLogin() {
    await this.page.goto('/login');
    await this.waitForPageLoad();
  }

  async login(email: string, password: string) {
    await this.fillInput(this.loginEmailInput, email);
    await this.fillInput(this.loginPasswordInput, password);
    await this.clickElement(this.loginButton);
  }

  async signup(name: string, email: string) {
    await this.fillInput(this.signupNameInput, name);
    await this.fillInput(this.signupEmailInput, email);
    await this.clickElement(this.signupButton);
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      await this.loggedInUser.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async getErrorMessage(): Promise<string> {
    return await this.getElementText(this.errorMessage);
  }
}
