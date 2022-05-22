import { test, expect } from "@playwright/test";
// Importing pages required for test script.
import CommonFunctions from "../pages/common.page";
import LoginPage from "../pages/Login.page";
import LogoutPage from "../pages/Logout.page";
import Env from "../utils/environment";
import * as data from "../data/login.mock.json";

test.describe("TC001", () => {
  // my pages
  let login: LoginPage;
  let logout: LogoutPage;
  let common: CommonFunctions;

  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto(Env.test);
    login = new LoginPage(page);
    logout = new LogoutPage(page);
    common = new CommonFunctions(page);
  });

  test("Test logout flow", async ({ page }) => {
    await login.login(data.username, data.pass);
    expect(page.url()).toBe("https://the-internet.herokuapp.com/secure");
    await logout.clickLogoutBtn();
    expect(page.url()).toBe("https://the-internet.herokuapp.com/login");
    const toaster = await common.toaster();
    expect(await toaster?.textContent()).toContain(
      "You logged out of the secure area!"
    );
    await page.screenshot({
      path: `./media/screenshots/screenshot-successful-logout${Date.now()}.png`,
    });
  });
});
