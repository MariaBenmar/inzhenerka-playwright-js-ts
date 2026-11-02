import {test, expect} from '@playwright/test';

test.describe('Waiting mechanism in playwright', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
    });
    
    test('wait for element toBeHidden()', async ({ page }) => {
        await page.locator('input.new-todo').fill('Task 1');
        await page.locator('input.new-todo').press('Enter');
        await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();

    });



    test('wait for Locator.waitFor()', async ({ page }) => {
        await page.locator('input.new-todo').fill('Task 1');
        await page.locator('input.new-todo').press('Enter');
        await page.locator('.view').filter({ hasText: 'Task 1' }).getByRole('checkbox').click();
        await expect(page.locator('.todo-list li.completed')).toHaveCount(1); 
        await page.getByRole('button', { name: 'Clear completed' }).waitFor();
        await expect(page.getByRole('button', { name: 'Clear completed' })).toBeVisible();
        await page.getByRole('link', { name: 'Active' }).click();
    

        await page.locator('.todo-list li').waitFor({ state: 'hidden' });
    });

});