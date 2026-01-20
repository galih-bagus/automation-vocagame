let driver;

function setDriver(newDriver) {
   driver = newDriver;
}

function getDriver() {
   if (!driver) {
      throw new Error("Driver has not been initialized");
   }
   return driver;
}

module.exports = { setDriver, getDriver };
