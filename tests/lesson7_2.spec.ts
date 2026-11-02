import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
    });

test('timeout demo: test.setTimeout vs waitForTimeout', async ({ page }) => {
  test.setTimeout(5000); // waiting 5 seconds for the test to complete, otherwise it will fail

  await page.locator('input.new-todo').fill('Task 1');
  await page.locator('input.new-todo').press('Enter');

  await page.waitForTimeout(31000); // wait 31 seconds without conditions
});

test('wait for URL using waitForURL', async ({ page }) => {
  await page.getByRole('link', { name: 'Active' }).click();
  await page.waitForURL('**/active'); // no wait for "N seconds", but specific event - URL change
  await expect(page).toHaveURL(/#\/active/);
});