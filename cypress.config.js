// cypress.config.js
const allureWriter = require('@shelex/cypress-allure-plugin/writer'); 
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // 1. Set the PRIMARY reporter to the multi-reporter utility
    reporter: 'cypress-multi-reporters',
    
    // 2. Point the reporter to the config file for reporter options
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
    
    setupNodeEvents(on, config) {
      // 3. This runs in the Node context and handles result writing
      allureWriter(on, config);
      return config;
    },
  },
});