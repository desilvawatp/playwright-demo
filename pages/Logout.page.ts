import { Page, Locator } from "@playwright/test";

export default class LoginPage {
  // Creating page and locator instances.
  readonly page: Page;
  readonly getLogoutBtn: Locator;

  // Initializing page instances that are received through test scripts.
  constructor(page: Page) {
    this.page = page;
    this.getLogoutBtn = page.locator("a[href='/logout']");
  }

  // Returning page elements.
  eleLogoutBtn = async () => await this.getLogoutBtn;

  // Returning page functions.
  public async clickLogoutBtn() {
    const ele = await this.eleLogoutBtn();
    await ele?.click();
  }
}
