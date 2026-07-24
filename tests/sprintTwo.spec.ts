import { test, expect } from '@playwright/test';

test.describe('Sprint 2 - Pagination', () => {
    test.beforeEach(async ({ page }) =>{
        // Navigate to Page
        await page.goto('https://practicesoftwaretesting.com/');
        // Confirm Title is present and correct
        await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);
        //confirms user is on homepage
        await expect(page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible(); 
    })
    test('AC3', async ({ page })=> {
        // AC3 – Pagination controls displayed
        // Given there are more products than fit on one page
        // Then pagination controls are displayed below the product grid. 
        await expect(page.locator('ul.pagination')).toBeVisible();

    });
    test('AC4', async ({ page }) => {
        // AC4 – Page navigation
        // Given pagination controls are displayed
        // When I click a page number
        // Then the product grid updates to show products for that page
        // And the current page number is visually highlighted. 

        const child = page.getByRole('button', { name: 'Page-1' });
        const parent = page.locator('li').filter({ has: child});

        await expect(parent).toHaveClass('page-item active');

        // await expect(page.getByRole('button', { name: 'Page-1' })).toHaveClass('active');
    });
});

test.describe('Search Functionality', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to Page
        await page.goto('https://practicesoftwaretesting.com/');
        // Confirm Title is present and correct
        await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);
        //confirms user is on homepage
        await expect(page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible(); 
    });

    test('AC5', async ({ page })=> {
        // AC5 – Search input is displayed
        // Given I am on the product overview page
        // Then a search input field is displayed. 
        await expect(page.getByTestId('search-query')).toBeVisible();
    });

    test('AC6', async ({ page }) => {
        // AC6 – Minimum search length
        // Given I enter fewer than 3 characters in the search field
        // When I submit the search
        // Then the search is not executed and a validation error is shown. 

        //NOTE: Error functionality appears to be disabled, bug reported, see JIRA-XXXYYY
        await page.getByTestId('search-query').fill('aa');
        await expect(page.getByTestId('search-caption')).not.toBeVisible();
    });

    test('AC7', async ({ page }) => {
        // AC7 – Maximum search length
        // Given I am entering a search query
        // Then the search input accepts a maximum of 40 characters. 

        // 41 characters
        await page.getByTestId('search-query').fill('aaaaabbbbbcccccdddddeeeeefffffggggghhhhhi');
        await expect(page.getByTestId('search-caption')).not.toBeVisible();

        // 40 Characters
        await page.getByTestId('search-query').fill('aaaaabbbbbcccccdddddeeeeefffffggggghhhhh');
        await page.getByTestId('search-submit').click();
        await expect(page.getByTestId('search-caption')).toBeVisible();
        await expect(page.getByTestId('search-term')).toBeVisible();
        await expect(page.getByTestId('search-term')).toContainText('aaaaabbbbbcccccdddddeeeeefffffggggghhhhh');
    });

    test('AC8', async ({ page }) => {
        // AC8 – Search results displayed
        // Given I enter a valid search query (3–40 characters)
        // When I submit the search
        // Then the product grid updates to show only matching products. 
        await page.getByTestId('search-query').fill('Cordless');
        await page.getByTestId('search-submit').click();
        await expect(page.getByTestId('search-caption')).toBeVisible();
        await expect(page.getByTestId('search-term')).toBeVisible();
        await expect(page.getByTestId('search-term')).toContainText('Cordless');

        // const homePageGrid = page.locator('div.container[_ngcontent-ng-c670033506]');
        const homePageGrid = await page.getByTestId('search_completed');
        await expect(homePageGrid).toBeVisible();
        //const gridItems = homePageGrid.locator('.card');

        const rCards = await page.locator('img.card-img-top');
        const count = await rCards.count();
        console.log(count)

        const relatedItemsList: any = [];

        for(let i = 0; i < count; i++){
            const text = await rCards.nth(i).getAttribute('alt');
            relatedItemsList.push(text?.trim());
        };

        console.log(relatedItemsList)

        for(const el of relatedItemsList){
            // image elements don't have visible text; assert against the alt attribute
            await expect(page.getByAltText(el)).toHaveAttribute('alt', /Cordless/);
        };
    });

    test('AC9', async ({ page }) => {
        // AC9 – Search resets filters
        // Given I have active filters (category, brand, sorting)
        // When I submit a search query
        // Then all active filters are reset to their defaults. 

        //Category
        await page.getByText('Tool Belts').check();
        await expect(page.getByText('Tool Belts')).toBeChecked();

        await page.getByTestId('search-query').fill('Drill');
        await page.getByTestId('search-submit').click();

        await expect(page.getByText('Tool Belts')).not.toBeChecked();

        // Navigate to Page
        await page.goto('https://practicesoftwaretesting.com/');
        // Confirm Title is present and correct
        await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);

        //Brand
        await page.getByText('MightyCraft Hardware').check();
        await expect(page.getByText('MightyCraft Hardware')).toBeChecked();

        await page.getByTestId('search-query').fill('Drill');
        await page.getByTestId('search-submit').click();

        await expect(page.getByText('MightyCraft Hardware')).not.toBeChecked();

        // Navigate to Page
        await page.goto('https://practicesoftwaretesting.com/');
        // Confirm Title is present and correct
        await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);

        //Sustainability - Show only eco-friendly products
        await page.getByText('Show only eco-friendly products').check();
        await expect(page.getByText('Show only eco-friendly products')).toBeChecked();

        await page.getByTestId('search-query').fill('Drill');
        await page.getByTestId('search-submit').click();

        await expect(page.getByText('Show only eco-friendly products')).not.toBeChecked();

    });
});

test.describe('Filtering by Category', () => {
    test.beforeEach(async ({ page }) =>{
        // Navigate to Page
        await page.goto('https://practicesoftwaretesting.com/');
        // Confirm Title is present and correct
        await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);
        //confirms user is on homepage
        await expect(page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible(); 
    });

    test('AC10 - Category filter is displayed', async ({ page }) =>{
        // Given I am on the product overview page
        // Then a list of category checkboxes is displayed in the sidebar. 

        await expect(page.locator('#filters').getByText('Hand Tools')).toBeVisible();
        await expect(page.locator('#filters').getByText('Power Tools')).toBeVisible();
        await expect(page.locator('#filters').getByText('Other')).toBeVisible();
    });

    test('AC11 - Hierarchical Categories', async ({ page }) => {
        // Given the category filter is displayed
        // Then categories are shown in a tree structure with parent and child categories. 
    });

    test('AC12 - Selecting a parent category', async ({ page }) => {
        // Given a parent category has child categories
        // When I check the parent category checkbox
        // Then all child category checkboxes are also checked
        // And the product grid updates to show products from all those categories. 
    });

    test('AC13 - Deselecting child categories', async ({ page }) => {
        // Given all child categories of a parent are checked
        // When I uncheck all child category checkboxes
        // Then the parent category checkbox is also unchecked. 
        // test?
    })
});