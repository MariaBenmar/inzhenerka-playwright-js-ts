import {test, expect} from '@playwright/test';

test.describe('CSS or xPath', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
    });
    
    test('use CSS selector :nth-child.', async ({ page }) => {
        for (let i = 1; i <= 3; i++) {
            await page.locator('input.new-todo').fill(`Task ${i}`);
            await page.locator('input.new-todo').press('Enter');
        }

        await expect(page.locator('.todo-list li:nth-child(2)')).toHaveText('Task 2');
        
    });

    test('use CSS + :not()', async ({ page }) => {
        for (let i = 1; i <= 3; i++) {
            await page.locator('input.new-todo').fill(`Task ${i}`);
            await page.locator('input.new-todo').press('Enter');
        }
        await page.locator('.todo-list li:nth-child(2) .toggle').click();
        await expect(page.locator('.todo-list li.completed')).toHaveCount(1);   
        await expect(page.locator('.todo-list li:not(.completed)')).toHaveCount(2);
    });

    test('use xPath', async ({ page }) => {
        for (let i = 1; i <= 3; i++) {
            await page.locator('input.new-todo').fill(`Task ${i}`);
            await page.locator('input.new-todo').press('Enter');
        }
        await page.locator('xpath=//label[text()="Task 1"]/ancestor::li').click();
        await expect(page.locator('xpath=//label[text()="Task 1"]/ancestor::li')).not.toHaveClass(/completed/);
        await page.locator('li:has(label:text("Task 1"))').click();
        await expect(page.locator('li:has(label:text("Task 1"))')).not.toHaveClass(/completed/);
        
        
        
    });

});
