const { Builder } = require("selenium-webdriver");
const driverManager = require("./driver");

async function route(url) {
   const browser = process.env.BROWSER?.toLowerCase() || "chrome";
   const driver = await new Builder().forBrowser(browser).build();

   await driver.get(url);
   await driver.manage().window().maximize();

   driverManager.setDriver(driver);
   return driver;
}

module.exports = { route };
