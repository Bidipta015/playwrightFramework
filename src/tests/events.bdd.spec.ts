import { test, expect } from '@playwright/test';
import { given_homepage, when_navigate_to, then_page_has_heading } from './steps';

test('Events page health (BDD)', async ({ page }) => {
  await given_homepage(page);
  await when_navigate_to(page, '/events');
  await then_page_has_heading(page, /Events|Global Leadership Event/);
});
