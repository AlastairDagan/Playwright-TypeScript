import {test, expect} from '@playwright/test'

test('QUERY /products', async ({ request }) => {
    const apiURL = 'https://api.practicesoftwaretesting.com';
    // const resp = await request.get(apiURL + '/products');
    const resp = await request.get(`${apiURL}/products`);

    expect(resp.status()).toBe(200);
    const body = await resp.json();
    // console.log(respBody);

    await expect(body.data.length).toBe(9);    
});