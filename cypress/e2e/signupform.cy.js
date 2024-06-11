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
