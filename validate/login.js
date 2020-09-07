/*
login.js (validator)

Export a function called validateLoginInput
which takes 'data' as its' parameter. 'data' 
will be received from the Front End login form 
and parsed here.

Returns:
    errors: (dictionary) containing all errors if any.
    isValid: (boolean) checks if we have any errors or not.
*/
const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    //empty fields are converted into empty strings.
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Check email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //Check password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};