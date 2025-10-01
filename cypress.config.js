// // cypress.config.js
// const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// const { defineConfig } = require('cypress');

// module.exports = defineConfig({
//     e2e: {
//         // 1. Set the PRIMARY reporter to the multi-reporter utility
//         reporter: 'cypress-multi-reporters',
//         experimentalStudio: true,
//         // 2. Point the reporter to the config file for reporter options
//         reporterOptions: {
//             configFile: 'reporter-config.json',
//         },

//         setupNodeEvents(on, config) {
//             // 3. This runs in the Node context and handles result writing
//             allureWriter(on, config);
//             return config;
//         },
//         baseUrl: 'https://aps-rejanglebong.skwn.dev/dev',
//         video: true,
//         screenshotOnRunFailure: true,
//         screenshotsFolder: 'cypress/screenshots',
//         videosFolder: 'cypress/videos',
//     },
// });
// cypress.config.js (di root repo)
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://aps-rejanglebong.skwn.dev/dev',
    experimentalStudio: true,

    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },

    setupNodeEvents(on, config) {
      // menulis hasil ke allure-results
      allureWriter(on, config);
      return config;
    },

    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
  },

  // ➜ tambahkan env ini (opsional tapi direkomendasikan)
  env: {
    allure: true,
    allureResultsPath: 'allure-results'
    // opsi lain jika perlu:
    // allureAttachRequests: true,
    // allureLogCypress: true,
  },
});
