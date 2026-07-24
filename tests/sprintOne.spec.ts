import { test, expect } from '@playwright/test';

test.describe('Sprint 1 - Product Overview', () => {
  test.beforeEach(async ({page})=>{
    // Navigate to Page
    await page.goto('https://practicesoftwaretesting.com/');
    // Confirm Title is present and correct
    await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);
    //confirms user is on homepage
    await expect(page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible(); 
  });

  
  test('AC1 - Grid Exists on Homepage', async ({ page }) => {
    // Given I navigate to the home page
    // Then a grid of product cards is displayed showing all products.
    await expect(page.locator('div.container[_ngcontent-ng-c670033506]')).toBeVisible();
  });

  // Given the product overview is displayed
  // Then each product card shows:
  test('AC2 - grid exists with details', async ({ page }) => {
    //const homePageGrid = page.getByText('Combination Pliers ABCDE$14.15 Pliers ABCDE$12.01 Bolt Cutters ABCDE$48.41 Long');
    const homePageGrid = page.locator('div.container[_ngcontent-ng-c670033506]');
    await expect(homePageGrid).toBeVisible();
    const gridItems = homePageGrid.locator('.card');
    await expect(gridItems).toHaveCount(9);

    // Validate that each card has an image, a name, and a price
    const gridCheck = [
      page.locator(".card-img-top"),
      page.getByTestId('product-price'),
      page.getByTestId("product-name")
    ];

    for(let el of gridCheck){
      await expect(el).toHaveCount(9)
    };
  });

  // Given the product overview is displayed
  // When I click on a product card
  // Then I am navigated to the product detail page for that product. 
  test("AC3 - navigate to product details page", async ({ page }) => {
    // Confirm grid is displayed
    //const homePageGrid = page.getByText('Combination Pliers ABCDE$14.15 Pliers ABCDE$12.01 Bolt Cutters ABCDE$48.41 Long');
    const homePageGrid = page.locator('div.container[_ngcontent-ng-c670033506]');
    await expect(homePageGrid).toBeVisible();
    // click on a product card
    // let comboPliersCard:String = 'product-01KXF27757V0JZ1K675BT80WX3';
    // await page.getByTestId(`${comboPliersCard}`).click();
    await page.getByRole('img', {name: 'Combination Pliers'}).click();
    // await page.getByAltText('Combination Pliers')
    // Confirm user is on product page
    await expect(page).toHaveTitle(/Combination Pliers - Practice Software Testing - Toolshop - v5.0/);
  });
});

test.describe('Sprint 1 - Product Detail', () => {

  test.beforeEach(async ({ page })=> {
    // Navigate to Page
    await page.goto('https://practicesoftwaretesting.com/');
    // Confirm Title is present and correct
    await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);
    //confirms user is on homepage
    await expect(page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible();     
    await page.getByTestId('nav-categories').click();
    await page.getByTestId('nav-power-tools').click();

    // Sheet Sander
    await page.getByAltText('Sheet Sander').click();

  });

  test('AC1', async ({ page}) => {
    // AC1
    // Given I click on a product from the overview OR category page,
    // Then the product detail page is displayed

    // Sheet Sander
    // await page.getByAltText('Sheet Sander').click();
    // validate that user is on product page
    await expect(page).toHaveTitle(/Sheet Sander - Practice Software Testing - Toolshop - v5.0/);
  });

  test('AC2', async ({ page}) => {
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
    }
  })
});

test.describe('Sprint 1 - Browse Products', () => {
  test.beforeEach(async ({page})=> {
    // Navigate to Page
    await page.goto('https://practicesoftwaretesting.com/');
    // Confirm Title is present and correct
    await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);
    //confirms user is on homepage
    await expect(page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible(); 
    await page.getByTestId('nav-categories').click();
    await page.getByTestId('nav-power-tools').click();
  });

  test('AC1', async ({page}) => {
    // Category Page is displayed
    // Given I click on a category name
    // Then a page with products belonging to that category is displayed
    await expect(page.getByTestId('page-title')).toContainText('Category: Power Tools');
  });

  test('AC2', async ({page})=> {
    // Category Title
    // Given the category page is displayed
    // Then the category name is shown as tthe page title.
    await expect(page).toHaveTitle(/Power Tools - Practice Software Testing - Toolshop - v5.0/)
  });

  test('AC3', async ({page})=> {
    // Products from selected category
    // Given the category page is displayed
    // Then only products belonging to the selected category are shown.

    // await expect(page.getByText('Power Tools Grinder Sander')).toBeVisible();
    // await expect(page).toHaveScreenshot('Power-Tools-Displayed-Only.png');

    await expect(page.locator('#filters').getByText('Power Tools')).toBeVisible();
    await expect(page.locator('#filters').getByText('Hand Tools')).not.toBeVisible();
    await expect(page.locator('#filters').getByText('Other')).not.toBeVisible();

    await expect(page).toHaveScreenshot('Power-Tools-Displayed-Only.png');

    const newArr = [
      'Grinder', 'Sander', 'Saw', 'Drill'
    ];

    for(const item of newArr){
      await expect(page.getByText(`${item}`, {exact: true})).toBeVisible();
    };

  });
});

test.describe('Sprint 1 - Contact Form', () => {

  // Before
  test.beforeEach(async ({page})=>{
    // Navigate to Page
    await page.goto('https://practicesoftwaretesting.com/');
    // Confirm Title is present and correct
    await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);
    //confirms user is on homepage
    await expect(page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible();    
    await page.getByTestId('nav-contact').click();
  });

  test('AC1', async ({ page })=> {
    // AC1 - Contact Form is accessible
    // Given I navigate to the contact page
    // Then a contact form is displayed
    
    // await expect(page.locator('div.auth-form')).toBeVisible();
    await expect(page.locator('form.ng-untouched')).toBeVisible();
  });  

  test('AC2', async ({ page }) => {
  // AC2 - Required Fields
  // Given the contact form is displayed 
  // Then the following fields are shown: 
    // First name (required)
    // Last name (required)
    // Email (required, must be valid format)
    // Subject (required, dropdown)
    // Message (required, minimum 50 characters)
    await expect(page.getByTestId('first-name')).toBeVisible();
    await expect(page.getByTestId('last-name')).toBeVisible();
    await expect(page.getByTestId('email')).toBeVisible();
    await expect(page.getByTestId('subject')).toBeVisible();
    await expect(page.getByTestId('message')).toBeVisible();
  });
  

  test('AC3', async ({ page }) => {
  // AC3 - Subject Dropdown is displayed
  // Given the subject dropdown is displayed
  // Then it includes the following options:
    //   Customer service
    //   Webmaster
    //   Return
    //   Payments
    //   Warranty
    //   Status of my order

    const dropdownList = page.locator('#subject > option');
    await expect(dropdownList).toHaveText(['Select a subject *',
      'Customer service', 'Webmaster', 'Return', 'Payments', 'Warranty', 'Status of my order'
    ]);

    // TODO: Might be beneficial to add a screenshot after clicking the dropdown, 
    // to visually confirm the list

    await page.getByTestId('subject').selectOption('customer-service');
  });
  

  test('AC4', async ({ page }) => {
    // AC4 – Message minimum length
    // Given I enter a message with fewer than 50 characters
    // Then a validation error is shown indicating the message must be at least 50 characters. 

    await page.getByTestId('first-name').fill('Test');
    await page.getByTestId('last-name').fill('Surname');
    await page.getByTestId('email').fill('test@test.com');
    await page.getByTestId('subject').click();
    await page.getByTestId('subject').selectOption('customer-service');
    await page.getByTestId('message').fill('Less than fifty characters.');
    await page.getByTestId('contact-submit').click();
    await expect(page.getByTestId('message-error')).toBeVisible();
    await expect(page.getByTestId('message-error')).toContainText('Message must be minimal 50 characters')
  });

  

  test('AC5', async ({ page }) => {
    // AC5 – Successful submission
    // Given all required fields are filled in with valid data
    // When I submit the contact form
    // Then a confirmation message is displayed
    // And the form is hidden. 

    await page.getByTestId('first-name').fill('Test');
    await page.getByTestId('last-name').fill('Surname');
    await page.getByTestId('email').fill('test@test.com');
    await page.getByTestId('subject').click();
    await page.getByTestId('subject').selectOption('customer-service');
    await page.getByTestId('message').fill('Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam.');
    await page.getByTestId('contact-submit').click();
    await expect(page.getByText('Thanks for  your message! We will contact you shortly.')).toBeVisible();
    // await expect(page.getByRole('form')).toBeHidden();
    await expect(page.locator('form')).toBeHidden();
  });
});