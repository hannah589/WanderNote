// File: src/utils/validation.js
// This file will hold our client-side validation functions
//regular expressions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions

// Function: is_Empty.
// Param: value = the input we wish to check
// This function will check the passed valued. Undefined, null, an empty object or empty string.
// Return true if any of the tests are true, false otherwise
export function is_Empty(value){
  value === undefined || value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)
}

// Function to check if a string contains any special characters
// This function will use a regular expression to test a value to see if it contains any special characters
// Return true if there are special characters
// returns false if there is only a-z or A-Z characters
export function alpha(value){
  let ex = /[^a-zA-Z]+$/;
  const result = ex.test(value);
  return result;
}

// check if one url is valid. Must start with http/s, with 1-126 characters. 1-6 and optional path
//doesn't accept www.example.com or word

//Regular expression to test we have a number of 2 decimal places
//return true if it matches digits/ any digit with 1 or 2 decimal places
export function isValidPrice(value){
  //d for digit
  let ex = /^\d+(\.d{1,2}?$)/;
  const result = ex.test(value);
  return result;
}

//password requires 8 characters, a letter and a number
export function isValidPwd(value){
  //d for digit
  let ex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const result = ex.test(value);
  return result;
}