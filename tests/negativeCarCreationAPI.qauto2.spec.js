import { test, expect } from '@playwright/test';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

test('Authenticated user cannot create a car with invalid model via API', async ({ request }) => {
    const loginResponse = await request.post('/api/auth/signin', {
        data: {
            email: process.env.QAUTO2_API_USER_EMAIL,
            password: process.env.QAUTO2_API_USER_PASSWORD,
            remember: false,
        },
    });

    expect(loginResponse.ok()).toBeTruthy();

    const requestBody = {
        carBrandId: 3,
        carModelId: 1,
        mileage: getRandomInt(25, 250),
    };

    const createCarResponse = await request.post('/api/cars', {
        data: requestBody,
    });

    expect(createCarResponse.status()).toBe(404);
});
