import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly cartProductNames: Locator;
  readonly cartProductPrices: Locator;
  readonly cartProductQuantities: Locator;
  readonly cartTotalPrice: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.cartProductNames = page.locator('.cart_description h4 a');
    this.cartProductPrices = page.locator('.cart_price p');
    this.cartProductQuantities = page.locator('.cart_quantity button');
    this.cartTotalPrice = page.locator('.cart_total_price');
    this.emptyCartMessage = page.locator('#empty_cart');
  }

  async navigateToCart() {
    await this.page.goto('/view_cart');
    await this.waitForPageLoad();
  }

  async getCartItemsCount(): Promise<number> {
    try {
      await this.cartItems.first().waitFor({ state: 'visible', timeout: 3000 });
      return await this.cartItems.count();
    } catch {
      return 0;
    }
  }

  async getProductNameByIndex(index: number): Promise<string> {
    return await this.getElementText(this.cartProductNames.nth(index));
  }

  async getProductPriceByIndex(index: number): Promise<string> {
    return await this.getElementText(this.cartProductPrices.nth(index));
  }

  async getProductQuantityByIndex(index: number): Promise<string> {
    return await this.getElementText(this.cartProductQuantities.nth(index));
  }

  async getAllProductNames(): Promise<string[]> {
    const count = await this.cartProductNames.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      names.push(await this.getElementText(this.cartProductNames.nth(i)));
    }
    return names;
  }

  async isCartEmpty(): Promise<boolean> {
    const itemsCount = await this.getCartItemsCount();
    return itemsCount === 0;
  }
}
