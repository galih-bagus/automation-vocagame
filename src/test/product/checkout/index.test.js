const element = require("../../../helper/element");
const helper = require("../../../helper/helper");
const assertion = require("../../../helper/assertion");
const loginPage = require("../../../page/auth/login/index.page");
const productPage = require("../../../page/product/checkout/index.page");
const { getDriver } = require("../../../helper/driver");
const { By, until } = require("selenium-webdriver");
const { faker, he } = require("@faker-js/faker");

describe("Voca Game Checkout Product", function () {
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

   it("Checkout Product Steam", async function () {
      await element.clickButton(loginPage.buttonMasuk);
      await element.fillField(loginPage.identifierField, `kandidat-galih@yopmail.com`);
      await element.clickButton(loginPage.buttonMasukAkun);
      await element.fillField(loginPage.passwordField, `Asdf1234!`);
      await element.clickButton(loginPage.buttonMasukAkun);
      await assertion.assertionActualExpectedText(loginPage.alertSuccess, `ok`);
      await assertion.shouldBeVisible(productPage.searchField);
      await element.fillField(productPage.searchField, `Steam`);
      await assertion.shouldBeVisible(productPage.steamOption);
      await element.clickButton(productPage.steamOption);
      await element.getSleep(8000);
      await assertion.assertionActualExpectedText(productPage.title, `Steam Voucher (Indonesia)`);
      await element.fillField(productPage.identifierField, `kandidat-galih@yopmail.com`);
      await element.clickButton(productPage.optionSteam);
      await element.getSleep(8000);
      await element.clickButton(productPage.qrisButton);
      await element.clickButton(productPage.qrisOption);
      await element.clickButton(productPage.buyButton);
      await assertion.assertionActualExpectedText(productPage.alertSuccess, `success checkout`);
   });
});
