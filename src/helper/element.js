const { By, until } = require("selenium-webdriver");
const { getDriver } = require("./driver");

async function fillField(selector, value) {
   const driver = getDriver();
   const ele = await driver.wait(until.elementLocated(By.xpath(selector)), 10000);
   await ele.clear();
   await ele.sendKeys(value);
}

async function clickButton(selector) {
   const driver = getDriver();
   const ele = await driver.wait(until.elementLocated(By.xpath(selector)), 10000);
   await ele.click();
}

async function getText(selector) {
   const driver = getDriver();
   const ele = await driver.wait(
      until.elementIsVisible(await driver.wait(until.elementLocated(By.xpath(selector)), 10000)),
      10000
   );
   return ele.getText();
}

async function getTitle(title) {
   const driver = getDriver();
   await driver.wait(until.titleIs(title), 10000);
}

async function getSleep(timeout) {
   const driver = getDriver();
   await driver.sleep(timeout);
}

module.exports = {
   fillField,
   getTitle,
   clickButton,
   getText,
   getSleep
};
