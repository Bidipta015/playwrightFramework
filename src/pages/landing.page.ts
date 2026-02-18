import { Page, Locator } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
  readonly header: Locator;
  readonly navLinks: Locator;
  readonly heroHeading: Locator;
  readonly choosePathSection: Locator;
  readonly testimonialsSection: Locator;
  readonly footer: Locator;
  readonly contactLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Header may be implemented with header/nav/role="banner"; use a broad selector
    this.header = page.locator('header, nav, [role="banner"], .site-header');
    this.navLinks = page.locator('header a[href], nav a[href], [role="banner"] a[href]');
    this.heroHeading = page.locator('h1').first();
    this.choosePathSection = page.locator('section', { hasText: 'Choose Your Path' });
    this.testimonialsSection = page.locator('section', { hasText: 'Real stories' });
    this.footer = page.locator('footer');
    this.contactLink = page.locator('a', { hasText: 'Connect With Us' });
  }

  async goto() {
    await this.page.goto('/');
    // Wait for the visible hero heading instead of relying on a header tag that may not exist
    await this.heroHeading.waitFor({ state: 'visible' });
  }

  async navLinkByText(text: string) {
    return this.page.locator('header a', { hasText: text }).first();
  }
}
