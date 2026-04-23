import { test, expect } from '../support/fixtures/userGaragePage';
import { STORAGE_STATE } from '../support/helper/storageState';

test.use({ storageState: STORAGE_STATE.qauto2 });

test('Registered user is logged in on garage page', async ({userGaragePage}) => {
    await expect(userGaragePage.addCarButton).toBeVisible();
});
