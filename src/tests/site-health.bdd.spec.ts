import { test, expect } from '@playwright/test';

test.describe('Site health (BDD)', () => {
  test('Given thelandingyounth homepage is reachable, When I open the homepage, Then I see the hero and CTA', async ({ page }) => {
    // Given
    const url = '/';

    // When
    await page.goto(url);

    // Then - basic checks
    await expect(page).toHaveURL(/theleadingyounth\.com/);
    const hero = page.locator('h1').first();
    await expect(hero).toBeVisible();
    await expect(hero).toHaveText(/Where Young Leaders Build|Where Young Leaders BuildGlobal Futures/);

    const cta = page.locator('a:has-text("Connect With Us"), a:has-text("Explore Programs"), a[href*="apply"]');
    await expect(cta.first()).toBeVisible();

    const main = page.locator('main, [role="main"]');
    await expect(main).toBeVisible();
  });
});
