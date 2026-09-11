import { test, expect } from '@playwright/test';

const TASK1 = 'Buy milk';
const TASK2 = 'Buy bread';
const TASK3 = 'Buy eggs';

test.beforeEach(async ({ page }) => { 
    
    await page.goto('https://demo.playwright.dev/todomvc/'); 
    
})

test('add 3 new tasks', async ({ page }) => {

    for (const TODO_TEXT of [TASK1, TASK2, TASK3]) {

        await page.locator('input.new-todo').fill(TODO_TEXT);
        await page.locator('input.new-todo').press('Enter');
        await expect(page.getByText(TODO_TEXT)).toBeVisible();

    }

    await expect(page.locator('.todo-list li')).toHaveCount(3);
    await expect(page.getByText('3 items left')).toBeVisible();

});


test('checkbox state + counter update', async ({ page }) => {

    for (const TODO_TEXT of [TASK1, TASK2, TASK3]) {

        await page.locator('input.new-todo').fill(TODO_TEXT);
        await page.locator('input.new-todo').press('Enter');
        await expect(page.getByText(TODO_TEXT)).toBeVisible();

    }

    await expect(page.locator('.todo-list li')).toHaveCount(3);
    await expect(page.getByText('3 items left')).toBeVisible();
    
    await page.locator('.view').filter({ hasText: TASK1 }).getByRole('checkbox').click();
    await expect(page.locator('.view').filter({ hasText: TASK1 }).getByRole('checkbox')).toBeChecked();
    await expect(page.locator('.todo-list li')).toHaveCount(3);
    await expect(page.getByText('2 items left')).toBeVisible();

});


test('conditional button visibility', async ({ page }) => {

    for (const TODO_TEXT of [TASK1, TASK2, TASK3]) {

        await page.locator('input.new-todo').fill(TODO_TEXT);
        await page.locator('input.new-todo').press('Enter');
        await expect(page.getByText(TODO_TEXT)).toBeVisible();

    }

    await expect(page.locator('.todo-list li')).toHaveCount(3);
    await expect(page.getByText('3 items left')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear completed' })).not.toBeVisible();
    
    await page.locator('.view').filter({ hasText: TASK1 }).getByRole('checkbox').click();
    await expect(page.locator('.view').filter({ hasText: TASK1 }).getByRole('checkbox')).toBeChecked();
    await expect(page.locator('.todo-list li')).toHaveCount(3);
    await expect(page.getByText('2 items left')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Clear completed' })).toBeVisible();
   
});