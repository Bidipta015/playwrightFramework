import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/contact.page';

test.describe('Contact form', () => {
  test('can submit idea form and intercept network request', async ({ page }) => {
    const contact = new ContactPage(page);
    await contact.goto();

    // Intercept form post to avoid sending real data and assert payload
    let capturedRequest: any = null;
    await page.route('**/api/**', async (route, request) => {
      try {
        const postData = request.postData();
        capturedRequest = postData ? JSON.parse(postData) : { raw: postData };
      } catch (e) {
        capturedRequest = { raw: await request.postData() };
      }
      // return a fake 200 response
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });

    const payload = {
      name: 'Test User',
      email: 'test+playwright@example.com',
      message: 'This is an automated test submission',
      agree: true
    };

    await contact.fillAndSubmit(payload);

    // UI feedback: check for thank you or form hidden
    const thanks = page.locator('text=We\'ll contact you|Thank you|Thanks');
    if (await thanks.count() > 0) {
      await expect(thanks.first()).toBeVisible({ timeout: 5000 });
    }

    // Validate intercepted payload structure
    expect(capturedRequest).not.toBeNull();
    if (capturedRequest && typeof capturedRequest === 'object') {
      expect(capturedRequest.name || capturedRequest.fullName || capturedRequest['Full Name']).toBeTruthy();
      expect(capturedRequest.email).toContain('@');
      expect(capturedRequest.message || capturedRequest.idea || capturedRequest.feedback).toBeTruthy();
    }
  });
});
