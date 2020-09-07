/*
register.js (validator)

Export a function call validateRegisterInput
which takes 'data' as its' parameter. 'data'
will be received from the Front End form for
the register page.

Returns:
    errors: (dictionary) containing any errors.
    isValid: (boolean) checks if we have any errors or not.
*/
const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //empty fields are converted to empty strings
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";


    //Check usernames
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }

    //Check email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //Check password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password filed is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm Password filed is required";
    }

    if (!Validator.isLength(data.password, {min:6, max:30})) {
        errors.password = "Password must be at least 6 characters, and at max 30 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid :isEmpty(errors)
    };
};