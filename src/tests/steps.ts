import { Page, expect } from '@playwright/test';

export async function given_homepage(page: Page) {
  // Use baseURL from config where possible
  await page.goto('/');
  await page.waitForLoadState('networkidle');
}

export async function when_navigate_to(page: Page, path: string) {
  // Accept both absolute and relative paths
  if (path.startsWith('http')) {
    await page.goto(path);
  } else {
    await page.goto(path);
  }
  await page.waitForLoadState('networkidle');
}

export async function then_page_has_heading(page: Page, matcher: RegExp | string) {
  const heading = page.locator('h1, h2').first();
  await expect(heading).toBeVisible({ timeout: 5000 });
  if (typeof matcher === 'string') {
    await expect(heading).toHaveText(matcher as string);
  } else {
    await expect(heading).toHaveText(matcher as RegExp);
  }
}

export async function then_page_has_cta(page: Page, textOrSelector: string) {
  const cta = page.locator(textOrSelector);
  await expect(cta.first()).toBeVisible({ timeout: 5000 });
}

export async function then_see_hero_and_cta(page: Page) {
  const hero = page.locator('h1').first();
  await expect(hero).toBeVisible();
  await expect(hero).toHaveText(/Where Young Leaders Build|Where Young Leaders BuildGlobal Futures/);
  const cta = page.locator('a:has-text("Connect With Us"), a:has-text("Explore Programs"), a[href*="apply"]');
  await expect(cta.first()).toBeVisible();
}
