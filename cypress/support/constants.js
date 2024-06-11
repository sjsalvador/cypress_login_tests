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

  