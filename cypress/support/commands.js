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
  