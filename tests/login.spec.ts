import { test, expect } from "@playwright/test";
// Importing pages required for test script.
import CommonFunctions from "../pages/common.page";
import LoginPage from "../pages/Login.page";
import Env from "../utils/environment";
import * as data from "../data/login.mock.json";

test.describe("TC001 - Login testcase", () => {
  // my pages
  let login: LoginPage;
  let common: CommonFunctions;

  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto(Env.test);
    login = new LoginPage(page);
    common = new CommonFunctions(page);
  });

  test("Test login flow", async ({ page }) => {
    expect(page.url()).toBe("https://the-internet.herokuapp.com/login");
    await login.enterUserName(data.username);
    await login.enterUserPassword(data.pass);
    await login.clickLoginBtn();
    const toaster = await common.toaster();
    expect(await toaster?.textContent()).toContain(
      "You logged into a secure area!"
    );
    await page.screenshot({
      path: `./media/screenshots/screenshot-successful-login${Date.now()}.png`,
    });
  });
});
