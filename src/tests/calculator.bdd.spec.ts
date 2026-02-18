import { test, expect } from '@playwright/test';
import { given_homepage, when_navigate_to, then_page_has_heading } from './steps';

test('Smart calculator health (BDD)', async ({ page }) => {
  await given_homepage(page);
  await when_navigate_to(page, '/evaluate');
  await then_page_has_heading(page, /Smart Calculator|Find Your Global Readiness Score/);
});
