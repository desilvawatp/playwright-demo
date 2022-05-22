import { Page } from "@playwright/test";

// Returning page functions.
export default class CommonFunctions {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  // Returning page elements.
  toaster = async () => await this.page.waitForSelector("div[id='flash']");
}
