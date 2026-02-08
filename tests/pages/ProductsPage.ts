import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly viewProductLinks: Locator;
  readonly addToCartButtons: Locator;
  readonly addToCartOnDetailPage: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productCards = page.locator('.productinfo');
    this.viewProductLinks = page.locator('a:has-text("View Product")');
    this.addToCartButtons = page.locator('.add-to-cart');
    this.addToCartOnDetailPage = page.getByRole('button', { name: 'Add to cart' });
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
    this.viewCartLink = page.locator('a:has-text("View Cart")');
  }

  async navigateToProducts() {
    await this.page.goto('/products');
    await this.waitForPageLoad();
  }

  async searchProduct(productName: string) {
    await this.fillInput(this.searchInput, productName);
    await this.clickElement(this.searchButton);
    await this.page.waitForTimeout(1000);
  }

  async viewFirstProduct() {
    await this.clickElement(this.viewProductLinks.first());
    await this.waitForPageLoad();
  }

  async addFirstProductToCart() {
    await this.clickElement(this.addToCartButtons.first());
    await this.continueShoppingButton.waitFor({ state: 'visible', timeout: 5000 });
  }

  async continueShoppingAfterAdd() {
    await this.clickElement(this.continueShoppingButton);
  }

  async goToCart() {
    await this.clickElement(this.viewCartLink);
    await this.waitForPageLoad();
  }

  async getFirstProductName(): Promise<string> {
    const nameElement = this.productCards.first().locator('p');
    return await this.getElementText(nameElement);
  }

  async getFirstProductPrice(): Promise<string> {
    const priceElement = this.productCards.first().locator('h2');
    return await this.getElementText(priceElement);
  }
}
