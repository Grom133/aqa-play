import { test as base, expect } from '@playwright/test';
import GaragePage from '../pom/GaragePage';
import { STORAGE_STATE } from '../helper/storageState';

export const test = base.extend({
    storageState: async ({}, use, testInfo) => {
        const environment = testInfo.project.name.includes('qauto2') ? 'qauto2' : 'qauto1';

        await use(STORAGE_STATE[environment]);
    },

    userGaragePage: async ({page}, use) => {
        const garagePage = new GaragePage(page);

        await garagePage.visit();
        await use(garagePage);
    },
});

export { expect };
