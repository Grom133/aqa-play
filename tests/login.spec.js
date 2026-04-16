import { test, expect } from '@playwright/test';

function generateRandomPrefix(length) {
    const chars = "0123456789";
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

test('User registration' , async ({page}) =>{
    await page.goto('/');
    const emailLogin = "naizbatkovich+"
    const emailAt = "@gmail.com"

    const email = emailLogin + generateRandomPrefix(5) + emailAt;

    await page.getByRole('button', { name: 'Sign In' }).click(),
    await page.getByRole('button', { name: 'Registration' }).click(),
    await page.locator('#signupName').fill('Oleg'),
    await page.locator('#signupLastName').fill('Olegov'),
    await page.getByRole('textbox', { name: 'Name Last name Email' }).fill(email),
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Welcome2qauto'),
    await page.getByRole('textbox', { name: 'Re-enter password' }).fill('Welcome2qauto'),
    await page.getByRole('button', { name: 'Register' }).click()
        
    
    await expect(page).toHaveURL(/panel/);
})