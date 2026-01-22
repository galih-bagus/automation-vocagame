const { Builder, until } = require("selenium-webdriver");
const driverManager = require("./driver");
const element = require("./element");
const assertion = require("./assertion");
const yopmailPage = require("../page/global/yopmail.page");
const { getDriver } = require("./driver");

async function route(url) {
   const browser = process.env.BROWSER?.toLowerCase() || "chrome";
   const driver = await new Builder().forBrowser(browser).build();

   await driver.get(url);
   await driver.manage().window().maximize();

   driverManager.setDriver(driver);
   return driver;
}

async function getOtpYopmail(email) {
   const driver = getDriver();
   await driver.switchTo().newWindow("tab");
   await driver.get("https://yopmail.com/");
   await element.fillField(yopmailPage.emailField, email);
   await element.clickButton(yopmailPage.buttonNext);
   await element.clickButton(yopmailPage.buttonRefresh);
   await driver.switchTo().frame("ifmail");
   const otp = await element.getText(yopmailPage.otp);
   await driver.switchTo().defaultContent();
   await driver.close();
   return otp;
}

module.exports = { route, getOtpYopmail };
