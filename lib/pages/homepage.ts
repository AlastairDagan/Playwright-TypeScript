import { expect, type Locator, type Page} from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly homePageLink: Locator;
    readonly title: RegExp;
    

    constructor(page: Page){
        this.page = page;
        this.homePageLink = page.getByRole('link', { name: 'Practice Software Testing -' });
        this.title = /Practice Software Testing - Toolshop - v5.0/;
    }

    async goto() {
        await this.page.goto('https://www.practicesoftwaretesting.com');
    }

    async confirmPageLoaded(){
        await this.page.waitForLoadState('load');
        await expect(this.homePageLink).toBeVisible();
        await expect(this.page).toHaveTitle(this.title);
    }

}