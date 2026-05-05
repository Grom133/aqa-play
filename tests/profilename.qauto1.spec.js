import { test, expect } from '@playwright/test';
import ProfilePage from '../support/pom/ProfilePage';
import { STORAGE_STATE } from '../support/helper/storageState';

test.use({ storageState: STORAGE_STATE.qauto1 });

test('Profile page displays mocked user name from profile response', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    const mockedProfileData = {
        name: 'botname',
        lastName: 'botlastname',
    };

    await page.route('https://qauto.forstudy.space/api/users/profile', async (route) => {
        const response = await route.fetch();
        const profileResponse = await response.json();

        await route.fulfill({
            response,
            json: {
                ...profileResponse,
                data: {
                    ...profileResponse.data,
                    ...mockedProfileData,
                },
            },
        });
    });

    await profilePage.visit();

    await expect(profilePage.profileName).toHaveText(`${mockedProfileData.name} ${mockedProfileData.lastName}`);
});
