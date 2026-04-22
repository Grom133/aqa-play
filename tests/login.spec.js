import { test, expect } from '@playwright/test';
import { generateEmail } from '../support/helper/userData';
import WelcomePage from '../support/pom/WelcomePage';
import RegistrationComponent from '../support/component/RegistrationComponent';

test('User registration' , async ({page}) =>{
    let welcomePage = new WelcomePage(page);
    let registration = new RegistrationComponent(page);
    
    await welcomePage.visit();
    await welcomePage.openSignUp();
    await registration.register('Oleg', 'Olegov', generateEmail(), 'Welcome2qauto', 'Welcome2qauto');   
    await registration.submit();
    await expect(page).toHaveURL(/panel/);
})