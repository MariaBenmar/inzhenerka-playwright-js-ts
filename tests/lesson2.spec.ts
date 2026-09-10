import { test, expect } from '@playwright/test';

test('add a new task', async ({ page }) => {

await page.goto('https://demo.playwright.dev/todomvc/');
await page.locator('input.new-todo').fill('Buy milk');
await page.locator('input.new-todo').press('Enter');
await expect(page.getByText('Buy milk')).toBeVisible();

});

test('execute a task', async ({ page }) => {

await page.goto('https://demo.playwright.dev/todomvc/');
await page.locator('input.new-todo').fill('Buy milk');
await page.locator('input.new-todo').press('Enter');
await expect(page.getByText('Buy milk')).toBeVisible();
await page.getByRole('checkbox').check();
await expect(page.getByText('Buy milk')).toHaveClass(/completed/);

});

test('remove a task', async ({ page }) => {

await page.goto('https://demo.playwright.dev/todomvc/');
await page.locator('input.new-todo').fill('Buy milk');
await page.locator('input.new-todo').press('Enter');
await expect(page.getByText('Buy milk')).toBeVisible();
await page.getByRole('button', { name: 'Destroy' }).click();
await expect(page.getByText('Buy milk')).not.toBeVisible();
});