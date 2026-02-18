import { test, expect } from '@playwright/test';

test('site health - homepage loads and key elements present', async ({ page }) => {
  await page.goto('https://theleadingyounth.com/');

  // basic checks
  await expect(page).toHaveURL(/theleadingyounth\.com/);
  // hero heading
  const hero = page.locator('h1').first();
  await expect(hero).toBeVisible();
  await expect(hero).toHaveText(/Where Young Leaders Build|Where Young Leaders BuildGlobal Futures/);

  // check navigation or main CTAs exist
  const cta = page.locator('a:has-text("Connect With Us"), a:has-text("Explore Programs"), a[href*="apply"]');
  await expect(cta.first()).toBeVisible();

  // quick accessibility check: main landmark roles
  const main = page.locator('main, [role="main"]');
  await expect(main).toBeVisible();
});
