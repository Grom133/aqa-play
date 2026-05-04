import { test as base, expect } from '@playwright/test';
import GaragePage from '../pom/GaragePage';

export const test = base.extend({
    userGaragePage: async ({page}, use) => {
        const garagePage = new GaragePage(page);

        await garagePage.visit();
        await use(garagePage);
    },
});

export { expect };
