import { test, expect } from '@playwright/test';

test.describe('Locators-getByRole', () => {

test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
});     

test('search button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
});

test('Docs link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
});

test ('Github icon', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
});

});

test.describe('Locators-getByPlaceholder, getByText, getByLabel', () => {

test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');
});     

test ('use getByPlaceholder', async ({ page }) => {
        await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
    });

test ('use getByText', async ({ page }) => {
    await page.locator('input.new-todo').fill('Buy milk');
    await page.locator('input.new-todo').press('Enter');
    await page.locator('input.new-todo').fill('Buy milk and bread');
    await page.locator('input.new-todo').press('Enter');
    await expect(page.getByText('Buy milk', { exact: true })).toBeVisible();
    await page.getByText('Buy milk').first().click();
    await expect(page.getByText('Buy milk').click()).rejects.toThrow();
    
});

test ('use getByLabel - checkbox Toggle all', async ({ page }) => {
    await page.locator('input.new-todo').fill('Buy milk');
    await page.locator('input.new-todo').press('Enter');
    await expect(page.getByLabel('Mark all as complete')).toBeVisible();
});

});

test.describe('Locators - username, Login, logo', () => {

test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
});     

test ('find username field ', async ({ page }) => {
    await expect(page.getByLabel('Username')).toBeVisible();
});

test ('click Login button', async ({ page }) => {
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
});

test ('click on the logo', async ({ page }) => {
    await page.getByAltText('Fork me on GitHub').click();
    await expect(page).toHaveURL('https://github.com/saucelabs/the-internet');
});


});
