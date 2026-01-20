const { By, until } = require("selenium-webdriver");
const { expect, assert } = require("chai");
const { getDriver } = require("./driver");

async function assertionActualExpectedText(selector, expectedValue) {
   const driver = getDriver();
   const ele = await driver.wait(until.elementLocated(By.xpath(selector)), 10000);
   await driver.wait(until.elementIsVisible(ele), 10000);

   const actualValue = await ele.getText();
   expect(actualValue).to.equal(expectedValue);
}

async function assertionActualExpectedValue(selector, expectedValue) {
   const driver = getDriver();
   const ele = await driver.wait(until.elementLocated(By.xpath(selector)), 10000);
   await driver.wait(until.elementIsVisible(ele), 10000);

   const actualValue = await ele.getAttribute("value");
   expect(actualValue).to.equal(expectedValue);
}

async function shouldBeVisible(selector) {
   const driver = getDriver();
   const ele = await driver.wait(until.elementLocated(By.xpath(selector)), 10000);

   const isDisplayed = await ele.isDisplayed();
   assert.strictEqual(isDisplayed, true);
}

module.exports = {
   assertionActualExpectedText,
   assertionActualExpectedValue,
   shouldBeVisible
};
