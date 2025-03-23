import { isValidPhoneNumber } from "libphonenumber-js";

const ValidationPlugin = {
  install(app) {
    app.config.globalProperties.$validations = {
      required,
      validClarkUEmail,
      isAmountValid,
      compareAndValidate,
      validNumber,
      onlyNumbers,
      validAlphabets,
      validPhone,
      validEmail,
      maxLength,
      minLength,
      hasNumber,
      hasLowerCaseLetter,
      hasUpperCaseLetter,
      hasSpecialCharacter,
    };
  },
};

// Validation for required field
function required(value, errorText = "This is a required field.") {
  return !!value || errorText;
}

// Validation for email with clarku.edu domain
function validClarkUEmail(
  value,
  errorText = "Must be a valid Clark University email."
) {
  const validDomain = /.+@clarku\.edu$/.test(value);
  return validDomain || errorText;
}

// Numerical Validations
// Validation to check for a valid amount
function isAmountValid(
  value,
  required = true,
  errorText = "Please enter a valid amount."
) {
  let validAmount = required
    ? !isNaN(value) && !isNaN(parseFloat(value)) && value > 0
    : value == 0 || value > 0;
  return validAmount || errorText;
}

// Validation to compare between two values
function compareAndValidate(value1, operators, value2, errorText = "Invalid.") {
  return (
    eval(
      parseFloat(value1).toFixed(2) + operators + parseFloat(value2).toFixed(2)
    ) || errorText
  );
}

// Validation for valid numbers
function validNumber(value, errorText = "Please enter a valid number.") {
  return (
    (!isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) >= 0) ||
    errorText
  );
}

// Text Validations
// Validation to check numbers only
function onlyNumbers(
  value,
  errorText = "Must contain only numbers.",
  returnBoolean = false
) {
  let isOnlyNumbers = /^\d+$/.test(value);
  return returnBoolean ? isOnlyNumbers : isOnlyNumbers || errorText;
}

// Validation to check alphabets only
function validAlphabets(value, errorText = "Must contain only letters.") {
  return /^[a-zA-Z]+$/.test(value) || errorText;
}

// Validation for valid phone numbers
function validPhone(
  value,
  required = false,
  errorText = "Must be a valid phone number."
) {
  let allowEmpty = !required ? value === "" || value === null : false;
  let isValidPhone = isValidPhoneNumber("+91" + value);
  let validationText = errorText;
  return isValidPhone || allowEmpty || validationText;
}

// Validation for valid email
function validEmail(
  value,
  required = false,
  errorText = "Must be a valid e-mail.",
  returnBoolean = false
) {
  let allowEmpty = !required ? value === "" || value === null : false;
  let validMailId = /.+@.+\..+/.test(value);
  return returnBoolean ? validMailId : validMailId || allowEmpty || errorText;
}

// Validation to check for max allowed characters
function maxLength(
  value,
  maxCharacters = 100,
  errorText = "This field exceeds maximum allowed characters."
) {
  return value.length <= maxCharacters || errorText;
}

// Validation to check for minimum length of characters
function minLength(
  value,
  minCharacters = 8,
  errorText = "This field has least number of characters"
) {
  return value.length >= minCharacters || errorText;
}

// Validation to check if at least one number is present
function hasNumber(value, errorText = "Must contain at least 1 number.") {
  return /\d/.test(value) || errorText;
}

// Validation to check if at least one lower case character is present
function hasLowerCaseLetter(
  value,
  errorText = "Must contain 1 lowercase letter."
) {
  return /[a-z]/.test(value) || errorText;
}

// Validation to check if at least one upper case character is present
function hasUpperCaseLetter(
  value,
  errorText = "Must contain at least 1 uppercase letter."
) {
  return /[A-Z]/.test(value) || errorText;
}

// Validation to check if at least one special character
function hasSpecialCharacter(
  value,
  errorText = "Must contain at least 1 special character."
) {
  return /[~`!@#$%*^&()_={}[\]:;,.<>+/?-]/.test(value) || errorText;
}

export default ValidationPlugin;
