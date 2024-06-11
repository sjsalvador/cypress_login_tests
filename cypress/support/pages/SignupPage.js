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
