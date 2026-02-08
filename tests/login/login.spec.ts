import { test, expect } from '../fixtures/pages.fixture';
import { TestDataHelper } from '../helpers/testData.helper';

test.describe('Login Flow Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC001: Successful login with valid credentials', async ({ loginPage, page }) => {
    const credentials = TestDataHelper.getTestCredentials();
    test.skip(
      credentials.email === 'testuser@example.com',
      'Set TEST_USER_EMAIL and TEST_USER_PASSWORD in .env to a registered account to run this test'
    );

    await loginPage.navigateToLogin();
    await expect(page).toHaveURL(/.*login/);
    await expect(loginPage.loginEmailInput).toBeVisible();

    await loginPage.login(credentials.email, credentials.password);
    await page.waitForLoadState('domcontentloaded');

    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test('TC002: Login with invalid credentials shows error', async ({ loginPage, page }) => {
    await loginPage.navigateToLogin();
    await loginPage.login('invalid@email.com', 'wrongpassword');
    await page.waitForTimeout(2000);

    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Your email or password is incorrect');
  });

  test('TC003: Login with empty credentials', async ({ loginPage, page }) => {
    await loginPage.navigateToLogin();
    await loginPage.loginButton.click();

    const emailValidity = await loginPage.loginEmailInput.evaluate(
      (el: HTMLInputElement) => el.validity.valid
    );
    expect(emailValidity).toBe(false);
  });
});
