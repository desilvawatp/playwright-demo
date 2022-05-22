import { Page, Locator } from "@playwright/test";

export default class LoginPage {
  // Creating page and locator instances.
  readonly page: Page;
  readonly getEmailTextField: Locator;
  readonly getPassTextField: Locator;
  readonly getLoginBtn: Locator;

  // Initializing page instances that are received through test scripts.
  constructor(page: Page) {
    this.page = page;
    this.getEmailTextField = page.locator("input[name='username']");
    this.getPassTextField = page.locator("input[name='password']");
    this.getLoginBtn = page.locator("button[type='submit']");
  }

  // Returning page elements.
  eleEmailTextField = async () => await this.getEmailTextField;

  elePassTextField = async () => await this.getPassTextField;

  eleLoginBtn = async () => await this.getLoginBtn;

  // Returning page functions.
  public async enterUserName(name: string) {
    const ele = await this.eleEmailTextField();
    if (ele != null) await ele.fill(name);
    else throw new Error("No element, hence failed");
  }

  public async enterUserPassword(pass: string) {
    const ele = await this.elePassTextField();
    await ele?.fill(pass);
  }

  public async clickLoginBtn() {
    const ele = await this.eleLoginBtn();
    await ele?.click();
  }

  // This function helps in logging into the website as a reusable function in many test cases. (Eg. Logout - hence without login we can't run logout).
  public async login(username: string, pass: string) {
    await this.enterUserName(username);
    await this.enterUserPassword(pass);
    await this.clickLoginBtn();
  }
}
