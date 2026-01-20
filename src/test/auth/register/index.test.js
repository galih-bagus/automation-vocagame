const element = require("../../../helper/element");
const helper = require("../../../helper/helper");
const assertion = require("../../../helper/assertion");
const registerPage = require("../../../page/auth/register/index.page");
const { getDriver } = require("../../../helper/driver");
const { faker } = require("@faker-js/faker");

describe("Voca Game Register", function () {
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

   it("Register with invalid email", async function () {
      await assertion.shouldBeVisible(registerPage.buttonMasuk);
      await element.clickButton(registerPage.buttonMasuk);
      await assertion.assertionActualExpectedText(registerPage.titleAuthPage, `Masuk Akun Vocagame`);
      await assertion.shouldBeVisible(registerPage.buttonDaftarSekarang);
      await element.clickButton(registerPage.buttonDaftarSekarang);
      await element.fillField(registerPage.firstNameField, faker.person.firstName());
      await element.fillField(registerPage.lastNameField, faker.person.lastName());
      await element.fillField(registerPage.phoneNumberField, faker.phone.number());
      await element.fillField(registerPage.emailField, `invalid`);
      await assertion.assertionActualExpectedText(registerPage.errorEmail, `Harap masukkan alamat email yang valid.`);
   });
});
