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

   it("Register with less than 6 character password", async function () {
      await element.fillField(registerPage.passwordField, `asd`);
      await assertion.assertionActualExpectedText(
         registerPage.errorPassword,
         `Kata sandi harus terdiri dari setidaknya 6 karakter.`
      );
   });

   it("Register with different confirmation password", async function () {
      await element.fillField(registerPage.passwordField, `Asdf1234!`);
      await element.fillField(registerPage.confirmPasswordField, `asd`);
      await assertion.assertionActualExpectedText(
         registerPage.errorPasswordConfirmation,
         `Konfirmasi kata sandi tidak cocok.`
      );
   });

   it("Register with data duplicate", async function () {
      await element.fillField(registerPage.emailField, `kandidat-galih@yopmail.com`);
      await element.fillField(registerPage.phoneNumberField, `+62 83299237`);
      await element.fillField(registerPage.passwordField, `Asdf1234!`);
      await element.fillField(registerPage.confirmPasswordField, `Asdf1234!`);
      await element.clickButton(registerPage.buttonCheckBox);
      await element.clickButton(registerPage.buttonBuatAkun);
      await element.clickButton(registerPage.optionOtp);
      await element.clickButton(registerPage.buttonLanjutkan);
      await assertion.assertionActualExpectedText(registerPage.alertSuccess, `OTP has been sent via email`);
   });

   it("Register with valid data", async function () {
      await element.fillField(registerPage.emailField, faker.internet.email());
      await element.fillField(registerPage.passwordField, `Asdf1234!`);
      await element.fillField(registerPage.confirmPasswordField, `Asdf1234!`);
      await element.clickButton(registerPage.buttonCheckBox);
      await element.clickButton(registerPage.buttonBuatAkun);
      await element.clickButton(registerPage.optionOtp);
      await element.clickButton(registerPage.buttonLanjutkan);
      await assertion.assertionActualExpectedText(registerPage.alertSuccess, `OTP has been sent via email`);
   });
});
