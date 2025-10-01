const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://aps-rejanglebong.skwn.dev/dev',
    experimentalStudio: true,

    reporter: 'cypress-multi-reporters',
    reporterOptions: { configFile: 'reporter-config.json' },

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },

    // ⇩ bantu stabil di CI
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,
    responseTimeout: 30000,
    retries: { runMode: 2, openMode: 0 },

    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
  },
  env: {
    allure: true,
    allureResultsPath: 'allure-results',
  },
});
