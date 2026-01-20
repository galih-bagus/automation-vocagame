# Selenium Template using JavaScript

This project provides a basic template for using Selenium WebDriver with JavaScript. It demonstrates the fundamental
setup required for automating web browsers and performing UI tests with Selenium and POM(Page Object Model).

## Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Allure Report](https://allurereport.org/) (Report automation)
- [Selenium Webdriver](https://www.selenium.dev/) (if using Chrome) or equivalent driver for your browser of choice.

## Getting Started

### 1. Clone this repository

To get started, clone this template into your local machine:

```bash
git clone https://github.com/galih-bagus/template-selenium
cd template-selenium
```

### 2. Install Dependencies

Install the required dependencies using npm. This will install Selenium WebDriver and other necessary packages:

```bash
npm install
```

### 3. Update WebDriver Configuration

By default, this project uses Chrome WebDriver. If you're using a different browser, update the `driver` configuration
accordingly in the `tests/example.test.js` file.

### 4. Create Your First Test

Inside the `tests` folder, you’ll find an example test file: `example.test.js`. This test demonstrates how to use
Selenium WebDriver with JavaScript.

### 5. Running Tests

To execute the tests, run the following command:

```bash
npm run test /filename/..
```

The script will open a browser, perform actions test case, and print the test results in the terminal.

If use allure report then run the following command:

```bash
npm run generate /filename/..
```

After run generate then run the following command to generate report in allure :

```bash
npm run report
```

### Project Structure

```
/selenium-template-js
├── /node_modules              # npm dependencies
├── /src                       # root folder
│   ├── data                   # data folder
│   └────| module              # data module
│        └──── sub_module      # data submodule
│             └──── file.data  # data file
│   ├── helper                 # helper folder
│   └───── helper.file         # helper file
│   ├── page                   # page folder
│   └────| module              # page module
│        └──── sub_module      # page submodule
│             └──── file.page  # page file
│   ├── test                   # test folder
│   └────| module              # test module
│        └──── sub_module      # test submodule
│             └──── file.test  # test file
├── .gitignore                 # Git ignore file
├── README.md                  # Project documentation
├── package.json               # Node.js project configuration
└── package-lock.json          # Dependency lock file
```


