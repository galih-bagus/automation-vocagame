const element = require("../../../helper/element");
const helper = require("../../../helper/helper");
const assertion = require("../../../helper/assertion");
const loginPage = require("../../../page/auth/login/index.page");
const forgotPasswordPage = require("../../../page/auth/forgotPassword/index.page");
const registerPage = require("../../../page/auth/register/index.page");
const { getDriver } = require("../../../helper/driver");
const { faker, he } = require("@faker-js/faker");

describe("Voca Game Forgot Password", function () {
   before(async function () {
      // Before all
      const url = process.env.URL;
      await helper.route(url);
   });

   after(async function () {
      const driver = getDriver();
      await driver.sleep(3000);
      await driver.quit();
   });

   it("Forgot Password with invalid email", async function () {
      await element.clickButton(loginPage.buttonMasuk);
      await element.clickButton(forgotPasswordPage.buttonLupaPassword);
      await element.getSleep(3000);
      await element.fillField(forgotPasswordPage.identifierField, `invalid`);
      await assertion.assertionActualExpectedText(
         forgotPasswordPage.errorIdentifierEmail,
         `Email harus berupa alamat email yang valid`
      );
   });

   it("Forgot Password with invalid account", async function () {
      await element.fillField(forgotPasswordPage.identifierField, `kandidat-galih-invalid@yopmail.com`);
      await element.clickButton(forgotPasswordPage.buttonKirimOtp);
      await assertion.assertionActualExpectedText(
         forgotPasswordPage.alertErrorInvalidAccount,
         `Email tidak ditemukan. Harap gunakan data yang valid dan terdaftar`
      );
   });

   it("Forgot Password With valid account", async function () {
      await element.fillField(loginPage.identifierField, `kandidat-galih-lupa@yopmail.com`);
      await element.clickButton(forgotPasswordPage.buttonKirimOtp);
      await element.clickButton(registerPage.optionOtp);
      await element.clickButton(registerPage.buttonLanjutkan);
      await assertion.assertionActualExpectedText(registerPage.alertSuccess, `OTP has been sent via email`);
   });
});
