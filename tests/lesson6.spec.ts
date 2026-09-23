import {test, expect} from '@playwright/test';

test.describe('errors, trace', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
    });
    
    test('catch errors', async ({ page }) => {
        for (let i = 1; i <= 4; i++) {
             await page.locator('input.new-todo').fill(`Task ${i}`);
            await page.locator('input.new-todo').press('Enter');
        }
        await page.locator('.todo-list li:nth-child(2) .toggle').click();
        await expect(page.locator('.todo-list li.completed')).toHaveCount(1);   
        await expect(page.locator('.todo-list li:not(.completed)')).toHaveCount(2);
    });

    test('trace', async ({ page, context }) => {
        await context.tracing.start({ screenshots: true, snapshots: true });
        for (let i = 1; i <= 4; i++) {
             await page.locator('input.new-todo').fill(`Task ${i}`);
            await page.locator('input.new-todo').press('Enter');
        }
        await page.locator('.todo-list li:nth-child(2) .toggle').click();
        await expect(page.locator('.todo-list li.completed')).toHaveCount(1);   
        await expect(page.locator('.todo-list li:not(.completed)')).toHaveCount(2);
        await context.tracing.stop({ path: 'trace.zip' });
    });

});