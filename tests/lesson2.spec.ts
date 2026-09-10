import { test, expect } from '@playwright/test';

const TODO_TEXT = 'Buy milk';

test.beforeEach(async ({ page }) => { 
    
    await page.goto('https://demo.playwright.dev/todomvc/'); 
    

})

test('add a new task', async ({ page }) => {

await page.locator('input.new-todo').fill(TODO_TEXT);
await page.locator('input.new-todo').press('Enter');
await expect(page.getByText(TODO_TEXT)).toBeVisible();

});

test('execute a task', async ({ page }) => {

await page.locator('input.new-todo').fill(TODO_TEXT);
await page.locator('input.new-todo').press('Enter');
await expect(page.getByText(TODO_TEXT)).toBeVisible();
await page.locator('.view').filter({ hasText: TODO_TEXT }).getByRole('checkbox').click();
await expect(page.locator('.todo-list li').filter({ hasText: TODO_TEXT })).toHaveClass(/completed/);

});

test('remove a task', async ({ page }) => {

await page.locator('input.new-todo').fill(TODO_TEXT);
await page.locator('input.new-todo').press('Enter');
await expect(page.getByText(TODO_TEXT)).toBeVisible();
await page.getByTestId('todo-item').filter({ hasText: TODO_TEXT }).hover();
await page.locator('.view').filter({ hasText: TODO_TEXT }).getByRole('button', { name: 'Delete' }).click();
await expect(page.getByText(TODO_TEXT)).not.toBeVisible();
});