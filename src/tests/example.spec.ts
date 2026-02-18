import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Example.com', () => {
  test('has working title and content', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await expect(page).toHaveTitle(/Example Domain/);
    await expect(home.heading).toHaveText('Example Domain');
  });
});
