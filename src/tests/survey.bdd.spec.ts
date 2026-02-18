import { test, expect } from '@playwright/test';
import { given_homepage, when_navigate_to, then_page_has_heading } from './steps';

test('Survey page health (BDD)', async ({ page }) => {
  await given_homepage(page);
  await when_navigate_to(page, '/survey');
  await then_page_has_heading(page, /Survey|Tell us your feedback/);
});
