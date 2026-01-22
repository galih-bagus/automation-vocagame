const element = require("../../../helper/element");
const helper = require("../../../helper/helper");
const assertion = require("../../../helper/assertion");
const loginPage = require("../../../page/auth/login/index.page");
const { getDriver } = require("../../../helper/driver");
const { faker, he } = require("@faker-js/faker");

describe("Voca Game Login", function () {
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

   it("Login with invalid email", async function () {
      await element.clickButton(loginPage.buttonMasuk);
      await element.fillField(loginPage.identifierField, `invalid`);
      await assertion.assertionActualExpectedText(
         loginPage.errorIdentifierEmail,
         `Email harus berupa alamat email yang valid`
      );
   });

   it("Login without password", async function () {
      await element.fillField(loginPage.identifierField, `kandidat-galih@yopmail.com`);
      await element.clickButton(loginPage.buttonMasukAkun);
      await assertion.assertionActualExpectedText(
         loginPage.errorIdentifierPasswordNull,
         `Kata sandi minimal harus 6 karakter.`
      );
   });

   it("Login with invalid password", async function () {
      await element.fillField(loginPage.passwordField, `Asd1233`);
      await element.clickButton(loginPage.buttonMasukAkun);
      await assertion.assertionActualExpectedText(
         loginPage.alertErrorWrongPassword,
         `Kata sandi salah. Verifikasi dan coba lagi.`
      );
   });

   it("Login with invalid account", async function () {
      await element.getSleep(5000);
      await element.clickButton(loginPage.identifierEdit);
      await element.fillField(loginPage.identifierField, `kandidat-galih-invalid@yopmail.com`);
      await element.clickButton(loginPage.buttonMasukAkun);
      await element.fillField(loginPage.passwordField, `Asd1233`);
      await element.clickButton(loginPage.buttonMasukAkun);
      await assertion.assertionActualExpectedText(
         loginPage.alertErrorInvalidAccount,
         `Email tidak ditemukan. Harap gunakan data yang valid dan terdaftar`
      );
   });

   it("Login with valid account", async function () {
      await element.getSleep(5000);
      await element.clickButton(loginPage.identifierEdit);
      await element.fillField(loginPage.identifierField, `kandidat-galih@yopmail.com`);
      await element.clickButton(loginPage.buttonMasukAkun);
      await element.fillField(loginPage.passwordField, `Asdf1234!`);
      await element.clickButton(loginPage.buttonMasukAkun);
      await assertion.assertionActualExpectedText(loginPage.alertSuccess, `ok`);
      // const otp = await helper.getOtpYopmail(`kandidat-galih`);
      // console.log("OTP : " + otp);
      // for (let i = 0; i < otp.length; i++) {
      //    const element = otp[i];
      //    console.log(element);
      // }
   });
});
