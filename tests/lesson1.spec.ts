import { test, expect } from '@playwright/test';

test('page has title', async ({ page }) => {

await page.goto('https://playwright.dev/');
await expect(page).toHaveTitle(/Playwright/);

});

test('click get started', async ({ page }) => {

await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
await expect(page).toHaveURL(/\/docs\/intro/);


});

test('page has not the title', async ({ page }) => {

await page.goto('https://playwright.dev/');
await expect(page).toHaveTitle(/thankss/);

});