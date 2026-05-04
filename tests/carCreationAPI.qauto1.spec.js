import { test, expect } from '@playwright/test';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

test('Authenticated user can create a car via API', async ({ request }) => {
    const loginResponse = await request.post('/api/auth/signin', {
        data: {
            email: process.env.QAUTO1_API_USER_EMAIL,
            password: process.env.QAUTO1_API_USER_PASSWORD,
            remember: false,
        },
    });

    expect(loginResponse.ok()).toBeTruthy();

    const requestBody = {
        carBrandId: 3,
        carModelId: 13,
        //по хорошому тут тре зробити рандом вибірку але я не придумав як красиво це зробити і щвидко
        mileage: getRandomInt(25, 250),
    };

    const createCarResponse = await request.post('/api/cars', {
        data: requestBody,
    });

    expect(createCarResponse.status()).toBe(201);
});
