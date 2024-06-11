# Cypress Test Automation Project

This project contains automated end-to-end tests for the Sign-up form using Cypress. The tests cover various scenarios for the signup form, ensuring that all fields are validated correctly and appropriate error messages are displayed.

## Technologies Used

The application is built with the following technologies:

- **Cypress**: End-to-end testing framework for modern web applications.
- **Node.js & npm**: For dependency and script management.
- **Mocha**: Test framework used by default in Cypress.
- **Chai**: Assertion library that allows natural language assertions.
- **Page Object Model (POM)**: Design pattern for organizing test code in a modular and maintainable way.

## Project Structure

```
cypress-project/
├── cypress/
│   ├── e2e/
│   │   └── signupform.cy.js
│   ├── support/
│   │   ├── pages/
│   │   │   └── SignupPage.js
│   │   ├── commands.js
│   │   └── constants.js
├── node_modules/
├── cypress.json
├── package.json
└── README.md
```

### Directory Breakdown

- **e2e**: Contains end-to-end test files.
- **support/pages**: Contains Page Object Models (POM) for the application.
- **support**: Contains custom Cypress commands and constants.

## Setup Instructions

### Prerequisites

- Node.js and npm must be installed. Download and install from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sjsalvador/bc_qachallenge.git
   cd cypress-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Cypress Configuration

Update the `cypress.json` file if needed:

```json
{
  "baseUrl": "https://rotogrinders.com/sign-up",
  "defaultCommandTimeout": 10000,
  "viewportWidth": 1280,
  "viewportHeight": 720
}
```

### Running the Tests

1. Open the Cypress Test Runner:

   ```bash
   npx cypress open
   ```

   Select a test to run from the Cypress Test Runner UI.

2. Run the tests in headless mode:

   ```bash
   npx cypress run
   ```

## Test Files

### `signupform.cy.js`

This file contains the test cases for the signup form. It uses the Page Object Model to interact with the application.

#### Example Test Case

```javascript
const { ERROR_MESSAGES, PASSWORD, SPECIAL_CHAR, ALREADY_CREATED_USERNAME, INVALID_EMAIL, ALREADY_CREATED_EMAIL, SHORT_PASSWORD } = require('../support/constants');
const SignupPage = require('../support/pages/SignupPage');

describe('Testing Sign-up Form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Verify all fields with valid data (TC01)', () => {
    cy.generateRandomUsername().then(username => {
      cy.generateRandomEmail().then(email => {
        SignupPage.fillUsername(username);
        SignupPage.fillEmail(email);
        SignupPage.fillPassword(PASSWORD);
        SignupPage.submitForm();

        cy.get('h1').should('have.text', 'Welcome to RotoGrinders! Thanks for signing up!');
      });
    });
  });

  it('Verify only valid data in username field and the others blank (TC02)', () => {
    cy.generateRandomUsername().then(username => {
      SignupPage.fillUsername(username);
      SignupPage.submitForm();
      cy.verifyErrorMessage(ERROR_MESSAGES.emailAndPasswordRequired);
    });
  });

  it('Verify only valid data in email field and the others blank (TC03)', () => {
    cy.generateRandomEmail().then(email => {
      SignupPage.fillEmail(email);
      SignupPage.submitForm();
      cy.verifyErrorMessage(ERROR_MESSAGES.usernameAndPasswordRequired);
    });
  });

  it('Verify only valid data in password field and the others blank (TC04)', () => {
    SignupPage.fillPassword(PASSWORD);
    SignupPage.submitForm();
    cy.verifyErrorMessage(ERROR_MESSAGES.usernameAndemailRequired);
  });

  it('Verify all fields left blank (TC05)', () => {
    SignupPage.submitForm();
    cy.verifyErrorMessage(ERROR_MESSAGES.allFieldsBlank);
  });

  it('Verify if the username field shows an error message for special characters entry (TC06)', () => {
    cy.generateRandomUsername().then(username => {
      cy.generateRandomEmail().then(email => {
        SignupPage.fillUsername(`${username}${SPECIAL_CHAR}`);
        SignupPage.fillEmail(email);
        SignupPage.fillPassword(PASSWORD);
        SignupPage.submitForm();
        cy.verifyErrorMessage(ERROR_MESSAGES.usernameWithSpecialChar);
      });
    });
  });

  it('Verify if the email field shows an error message for invalid email format (TC07)', () => {
    cy.generateRandomUsername().then(username => {
      SignupPage.fillUsername(username);
      SignupPage.fillEmail(INVALID_EMAIL);
      SignupPage.fillPassword(PASSWORD);
      SignupPage.submitForm();
      cy.verifyErrorMessage(ERROR_MESSAGES.invalidEmail);
    });
  });

  it('Verify if the email field shows an error message when using already used email (TC08)', () => {
    cy.generateRandomUsername().then(username => {
      SignupPage.fillUsername(username);
      SignupPage.fillEmail(ALREADY_CREATED_EMAIL);
      SignupPage.fillPassword(PASSWORD);
      SignupPage.submitForm();
      cy.verifyErrorMessage(ERROR_MESSAGES.emailTaken);
    });
  });

  it('Verify if the password field shows an error message for very short password format (TC09)', () => {
    cy.generateRandomUsername().then(username => {
      cy.generateRandomEmail().then(email => {
        SignupPage.fillUsername(username);
        SignupPage.fillEmail(email);
        SignupPage.fillPassword(SHORT_PASSWORD);
        SignupPage.submitForm();
        cy.verifyErrorMessage(ERROR_MESSAGES.shortPass);
      });
    });
  });

  it('Verify if the username field shows an error message when using already used username (TC10)', () => {
    cy.generateRandomEmail().then(email => {
      SignupPage.fillUsername(ALREADY_CREATED_USERNAME);
      SignupPage.fillEmail(email);
      SignupPage.fillPassword(PASSWORD);
      SignupPage.submitForm();
      cy.verifyErrorMessage(ERROR_MESSAGES.usernameTaken);
    });
  });

  it('Verify if the username field shows an error message for a space entry in the username (TC11)', () => {
    cy.generateRandomUsernameWithSpace().then(username => {
      cy.generateRandomEmail().then(email => {
        SignupPage.fillUsername(username);
        SignupPage.fillEmail(email);
        SignupPage.fillPassword(PASSWORD);
        SignupPage.submitForm();
        cy.verifyErrorMessage(ERROR_MESSAGES.usernameWithSpace);
      });
    });
  });
});
```

## Custom Commands

### `commands.js`

Defines custom Cypress commands for generating test data and performing common actions.

```javascript
Cypress.Commands.add('generateRandomUsername', () => {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let username = '';
  for (let i = 0; i < 20; i++) {
    username += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return username;
});

Cypress.Commands.add('generateRandomUsernameWithSpace', () => {
  return cy.generateRandomUsername().then(username => `${username} `);
});

Cypress.Commands.add('generateRandomEmail', () => {
  const timestamp = new Date().getTime();
  return `user${timestamp}@example.com`;
});

Cypress.Commands.add('verifyErrorMessage', (expectedMessage) => {
  cy.get('.notification.active.error p').should('have.text', expectedMessage);
});
```

## Page Object Model

### `SignupPage.js`

Encapsulates the actions and elements related to the signup form.

```javascript
class SignupPage {
  fillUsername(username) {
    cy.get('input[id="username"]').type(username);
  }

  fillEmail(email) {
    cy.get('input[type="email"]').eq(0).type(email);
  }

  fillPassword(password) {
    cy.get('input[id="password"]').type(password);
  }

  submitForm() {
    cy.contains('input', 'Create Account').click();
  }
}

module.exports = new SignupPage();
```

## Constants

### `constants.js`

Contains error messages and other constants used in the tests.

```javascript
const ERROR_MESSAGES = {
  emailAndPasswordRequired: 'An email is required.A password is required.',
  usernameAndPasswordRequired: 'A username is required.A password is required.',
  usernameAndemailRequired: 'A username is required.An email is required.',
  allFieldsBlank: 'A username is required.An email is required.A password is required.',
  usernameWithSpecialChar: 'Your username may only contain letters and numbers.',
  usernameWithSpace: 'Your username may only contain letters and numbers.',
  usernameTaken: 'That username is already taken.',
  invalidEmail: 'Your email must be valid.',
  emailTaken: 'That email is already taken.',
  shortPass: 'Your password must be at least 6 characters long.',
};

const PASSWORD = 'Password123!';
const SPECIAL_CHAR = '!';
const ALREADY_CREATED_USERNAME = 'sjsalvador';
const INVALID_EMAIL = 'test@test';
const ALREADY_CREATED_EMAIL = 'sjsalvador.it@gmail.com';
const SHORT_PASSWORD = 'pas';

module.exports = {
  ERROR_MESSAGES,
  PASSWORD,
  SPECIAL_CHAR,
  ALREADY_CREATED_USERNAME,
  INVALID_EMAIL,
  ALREADY_CREATED_EMAIL,
  SHORT_PASSWORD
};
```

## Conclusion

This project is structured to provide a clean, maintainable, and scalable approach to test automation using Cypress.

 By following the Page Object Model and utilizing custom commands, the tests are easy to read and maintain. For any issues or contributions, feel free to open a pull request or create an issue.