import { test, expect } from '@playwright/test';

function generateRandomPrefix(length) {
    const chars = "0123456789";
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

test('Empty form' , async ({page}) =>{
    await page.goto('/');

    await page.getByRole('button', { name: 'Sign In' }).click(),
    await page.getByRole('button', { name: 'Registration' }).click(),
    await page.locator('#signupName').focus(),
    await page.locator('#signupLastName').focus(),
    await page.getByRole('textbox', { name: 'Name Last name Email' }).focus(),
    await page.getByRole('textbox', { name: 'Password', exact: true }).focus(),
    await page.getByRole('textbox', { name: 'Re-enter password' }).focus(),
    await page.keyboard.press('Tab')        
    
    await expect(page.getByText('Name required', { exact: true })).toBeVisible();
    await expect(page.getByText('Last name required')).toBeVisible();
    await expect(page.getByText('Email required')).toBeVisible();
    await expect(page.getByText(/^Password required$/)).toBeVisible();
    await expect(page.getByText(/^Re-enter password required$/)).toBeVisible();
})

test('Invalid email' , async ({page}) =>{
    await page.goto('/');
    const emailLogin = "naizbatkovich+"

    await page.getByRole('button', { name: 'Sign In' }).click(),
    await page.getByRole('button', { name: 'Registration' }).click(),
    await page.locator('#signupName').fill('Oleg'),
    await page.locator('#signupLastName').fill('Olegov'),
    await page.getByRole('textbox', { name: 'Name Last name Email' }).fill(emailLogin),
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Welcome2qauto'),
    await page.getByRole('textbox', { name: 'Re-enter password' }).fill('Welcome2qauto'),
    //await page.getByRole('button', { name: 'Register' }).click()

    await expect(page.getByText('Email is incorrect')).toBeVisible();
})
test('Invalid name' , async ({page}) =>{
    await page.goto('/'); 
    const emailLogin = "naizbatkovich+"
    const emailAt = "@gmail.com"

    const email = emailLogin + generateRandomPrefix(5) + emailAt;
    
    await page.getByRole('button', { name: 'Sign In' }).click(),
    await page.getByRole('button', { name: 'Registration' }).click(),
    await page.locator('#signupName').fill('J'),
    await page.locator('#signupLastName').fill('Olegov'),
    await page.getByRole('textbox', { name: 'Name Last name Email' }).fill(email),
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Welcome2qauto'),
    await page.getByRole('textbox', { name: 'Re-enter password' }).fill('Welcome2qauto'),
    //await page.getByRole('button', { name: 'Register' }).click()

    await expect(page.getByText('Name has to be from 2 to 20 characters long', { exact: true })).toBeVisible();
})
test('Weak password' , async ({page}) =>{
    await page.goto('/'); 
    const emailLogin = "naizbatkovich+"
    const emailAt = "@gmail.com"

    const email = emailLogin + generateRandomPrefix(5) + emailAt;

    await page.getByRole('button', { name: 'Sign In' }).click(),
    await page.getByRole('button', { name: 'Registration' }).click(),
    await page.locator('#signupName').fill('John'),
    await page.locator('#signupLastName').fill('Olegov'),
    await page.getByRole('textbox', { name: 'Name Last name Email' }).fill(email),
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('email'),
    await page.keyboard.press('Tab') 

    await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();


})
test('Pass match' , async ({page}) =>{
    await page.goto('/'); 
    const emailLogin = "naizbatkovich+"
    const emailAt = "@gmail.com"

    const email = emailLogin + generateRandomPrefix(5) + emailAt;

    await page.getByRole('button', { name: 'Sign In' }).click(),
    await page.getByRole('button', { name: 'Registration' }).click(),
    await page.locator('#signupName').fill('John'),
    await page.locator('#signupLastName').fill('Olegov'),
    await page.getByRole('textbox', { name: 'Name Last name Email' }).fill(email),
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Welcome2qauto'),
    await page.getByRole('textbox', { name: 'Re-enter password' }).fill('Welcome2qauto2'),
    await page.keyboard.press('Tab') 

    await expect(page.getByText('Passwords do not match')).toBeVisible();
})