import { test, expect } from '@playwright/test';
import { generateEmail } from '../support/helper/userData';
import WelcomePage from '../support/pom/WelcomePage';
import RegistrationComponent from '../support/component/RegistrationComponent';

let welcomePage;
let registration;

test.beforeEach(async ({ page }) => {
    welcomePage = new WelcomePage(page);
    registration = new RegistrationComponent(page);
    await welcomePage.visit();
    await welcomePage.openSignUp();
});


test('Empty form' , async ({page}) =>{   
    await registration.register('', '', '', '', '');    
    await page.keyboard.press('Tab');
    await expect(registration.nameError).toBeVisible();
    await expect(registration.lastNameError).toBeVisible();
    await expect(registration.emailError).toBeVisible();
    await expect(registration.passwordError).toBeVisible();
    await expect(registration.repeatPasswordError).toBeVisible();   
})

test('Invalid email' , async ({page}) =>{    
    const emailLogin = "naizbatkovich+";
    await registration.register('Oleg', 'Olegovich', emailLogin, 'Welcome2qauto', 'Welcome2qauto');
    await expect(page.getByText('Email is incorrect')).toBeVisible();    
})

test('Invalid name' , async ({page}) =>{
    await registration.register('O', 'Olegovich', generateEmail(), 'Welcome2qauto', 'Welcome2qauto');
    await expect(page.getByText('Name has to be from 2 to 20 characters long', { exact: true })).toBeVisible();
})

test('Weak password' , async ({page}) =>{
    await registration.register('Oleg', 'Olegovich', generateEmail(), 'welcome2qauto', 'Welcome2qauto');
    await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
})

test('Pass match' , async ({page}) =>{
    await registration.register('Oleg', 'Olegovich', generateEmail(), 'Welcome2qauto', 'Welcome2qauto2');    
    await page.keyboard.press('Tab');
    await expect(page.getByText('Passwords do not match')).toBeVisible();
})