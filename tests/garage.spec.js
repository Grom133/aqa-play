import { test, expect } from '../support/fixtures/userGaragePage';

test('Registered user is logged in on garage page', async ({userGaragePage}) => {
    await expect(userGaragePage.addCarButton).toBeVisible();
});
