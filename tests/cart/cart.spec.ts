import { test, expect } from '../fixtures/pages.fixture';

test.describe('Shopping Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC004: Search product and add to cart', async ({ productsPage, cartPage, page }) => {
    await productsPage.navigateToProducts();
    await expect(page).toHaveURL(/.*products/);

    await productsPage.searchProduct('Blue Top');
    await page.waitForTimeout(1500);

    const productName = await productsPage.getFirstProductName();
    expect(productName).toBeTruthy();
    console.log(`Product found: ${productName}`);

    await productsPage.addFirstProductToCart();
    await productsPage.continueShoppingAfterAdd();
    await cartPage.navigateToCart();

    const itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBeGreaterThan(0);

    const cartProductNames = await cartPage.getAllProductNames();
    expect(cartProductNames.length).toBeGreaterThan(0);
    console.log(`Cart contains ${itemsCount} item(s)`);
  });

  test('TC005: Add multiple products to cart and verify', async ({ productsPage, cartPage, page }) => {
    await productsPage.navigateToProducts();
    await productsPage.addFirstProductToCart();
    await productsPage.continueShoppingAfterAdd();
    await productsPage.waitForModalClosed();
    await page.waitForTimeout(1000);

    const secondViewProduct = productsPage.viewProductLinks.nth(1);
    await secondViewProduct.waitFor({ state: 'visible', timeout: 15000 });
    await secondViewProduct.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await secondViewProduct.click();
    await expect(page).toHaveURL(/\/product_details\/\d+/, { timeout: 15000 });
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const addToCart = productsPage.addToCartOnDetailPage.first();
    await addToCart.waitFor({ state: 'visible', timeout: 15000 });
    await addToCart.click();
    await productsPage.continueShoppingButton.waitFor({ state: 'visible', timeout: 15000 });
    await productsPage.continueShoppingAfterAdd();

    await cartPage.navigateToCart();

    const itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBeGreaterThanOrEqual(2);
    console.log(`Cart has ${itemsCount} item(s)`);

    const firstProductName = await cartPage.getProductNameByIndex(0);
    const firstProductPrice = await cartPage.getProductPriceByIndex(0);
    const firstProductQty = await cartPage.getProductQuantityByIndex(0);

    expect(firstProductName).toBeTruthy();
    expect(firstProductPrice).toMatch(/Rs\.|₹/);
    expect(firstProductQty).toBeTruthy();

    console.log(`Product: ${firstProductName}, Price: ${firstProductPrice}, Qty: ${firstProductQty}`);
  });

  test('TC006: Cart persistence after page refresh', async ({ productsPage, cartPage, page }) => {
    await productsPage.navigateToProducts();
    await productsPage.addFirstProductToCart();
    await productsPage.continueShoppingAfterAdd();
    await cartPage.navigateToCart();

    const itemsCountBefore = await cartPage.getCartItemsCount();
    expect(itemsCountBefore).toBeGreaterThan(0);

    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    const itemsCountAfter = await cartPage.getCartItemsCount();
    expect(itemsCountAfter).toBe(itemsCountBefore);

    console.log(`Cart persistence verified: ${itemsCountBefore} items before, ${itemsCountAfter} items after refresh`);
  });
});
