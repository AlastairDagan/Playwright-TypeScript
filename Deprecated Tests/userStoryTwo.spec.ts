import { test, expect } from '@playwright/test';

test('Product Detail', async ({ page }) => {
    // Navigate to Page
    await page.goto('https://practicesoftwaretesting.com/');
    // Confirm Title is present and correct
    await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);
    //confirms user is on homepage
    await expect(page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible(); 

    //AC1
    // Given I click on a product from the overview OR category page,
    // Then the product detail page is displayed
    await page.getByTestId('nav-categories').click();
    await page.getByTestId('nav-power-tools').click();
    // Sheet Sander
    await page.getByAltText('Sheet Sander').click();
    // validate that user is on product page
    await expect(page).toHaveTitle(/Sheet Sander - Practice Software Testing - Toolshop - v5.0/);

     // Given the product detail page is displayed,
    // Then the following information is shown:
    //  product image
    //  product name
    //  product description
    //  product price
    //  category badge
    //  brand badge  
    await expect(page.getByRole('img', {name: 'Sheet Sander'})).toBeVisible();
    await expect(page.getByTestId('product-name')).toBeVisible();
    await expect(page.getByTestId('product-description')).toBeVisible();
    await expect(page.getByTestId('unit-price')).toBeVisible();
    await expect(page.getByLabel('category')).toBeVisible;
    await expect(page.getByLabel('brand')).toBeVisible;

    const relatedRow = page.locator('div.container[_ngcontent-ng-c2605822289]');
    await expect(relatedRow).toBeVisible();

    const rCards = await page.locator('img.card-img-top');
    const count = await rCards.count();
    // console.log(count);

    const relatedItemsList: any = [];

    for(let i = 0; i < count; i++){
      const text = await rCards.nth(i).getAttribute('alt');
      relatedItemsList.push(text?.trim());
    };

    for(const element of relatedItemsList){
      await expect(page.getByAltText(element)).toBeVisible();
      await page.getByAltText(element).click();
      await expect(page.getByTestId('product-name')).toBeVisible();
      await expect(page.getByTestId('product-name')).toContainText(element);
      await page.goBack();    
    };
  });