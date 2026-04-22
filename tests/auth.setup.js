import { test as setup, expect } from '@playwright/test';
import { mkdirSync } from 'fs';
import WelcomePage from '../support/pom/WelcomePage';
import RegistrationComponent from '../support/component/RegistrationComponent';
import { generateEmail } from '../support/helper/userData';
import { STORAGE_STATE } from '../support/helper/storageState';

setup('register user and save storage state', async ({ page }, testInfo) => {
    const environment = testInfo.project.name.includes('qauto2') ? 'qauto2' : 'qauto1';
    const welcomePage = new WelcomePage(page);
    const registration = new RegistrationComponent(page);

    await welcomePage.visit();
    await welcomePage.openSignUp();
    await registration.register('Oleg', 'Olegov', generateEmail(), 'Welcome2qauto', 'Welcome2qauto');
    await registration.submit();

    await expect(page).toHaveURL(/panel/);

    mkdirSync('playwright/.auth', {recursive: true});
    await page.context().storageState({path: STORAGE_STATE[environment]});
});
