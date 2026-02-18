import { Page, Locator, APIRequestContext, expect } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly privacyCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('form');
  // Prefer locating inputs inside the main contact form
  this.nameInput = this.form.locator('input[name="name"], input[placeholder*="Full Name"]').first();
  this.emailInput = this.form.locator('input[type="email"], input[name="email"]').first();
  this.messageInput = this.form.locator('textarea[name="message"], textarea[placeholder*="Your Idea"]').first();
  this.submitButton = this.form.locator('button[type="submit"], input[type="submit"]').first();
  this.privacyCheckbox = this.form.locator('input[type="checkbox"]').first();
  }

  async goto() {
    await this.page.goto('/');
    // Prefer scrolling to the form if present, otherwise use a link/button text
    if (await this.form.count() > 0) {
      await this.form.first().scrollIntoViewIfNeeded();
      return;
    }
    // if there's no inline form, navigate to the apply/connect page where a form likely lives
    const applyLink = this.page.locator('a[href*="apply"], a:has-text("Connect With Us"), a:has-text("Share your idea")');
    if (await applyLink.count() > 0) {
      await applyLink.first().click();
      // wait for a form on the apply page
      await this.page.waitForLoadState('networkidle');
    }
  }

  async fillAndSubmit(details: { name: string; email: string; message: string; agree?: boolean }) {
    await this.nameInput.fill(details.name);
    await this.emailInput.fill(details.email);
    await this.messageInput.fill(details.message);
    if (details.agree) {
      await this.privacyCheckbox.check();
    }
    await Promise.all([
      this.page.waitForResponse((resp) => resp.url().includes('/api') || resp.status() === 200),
      this.submitButton.click()
    ]);
  }
}
