import { test, expect } from '@playwright/test';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

test('Unauthenticated user cannot create a car via API', async ({ request }) => {
    const requestBody = {
        carBrandId: 3,
        carModelId: 13,
        mileage: getRandomInt(25, 250),
    };

    const createCarResponse = await request.post('/api/cars', {
        data: requestBody,
    });

    expect(createCarResponse.status()).toBe(401);
});
