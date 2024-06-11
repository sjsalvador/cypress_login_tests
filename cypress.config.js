const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    watchForFileChanges: false,
    baseUrl: "https://rotogrinders.com/sign-up", 
    defaultCommandTimeout: 10000,
  },
  env: {
    usuario: "",
    password: "",
  }

  
});
