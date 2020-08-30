const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errs = {};

    //empty fields are converted to empty strings
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";


    //Check usernames
    if (Validator.isEmpty(data.username)) {
        errs.username = "Username field is required";
    }

    //Check email
    if (Validator.isEmpty(data.email)) {
        errs.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errs.email = "Email is invalid";
    }

    //Check password
    if (Validator.isEmpty(data.password)) {
        errs.password = "Password filed is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errs.password2 = "Confirm Password filed is required";
    }

    if (!Validator.isLength(data.password, {min:6, max:30})) {
        errs.password = "Password must be at least 6 characters, and at max 30 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errs.password2 = "Passwords must match";
    }

    return {
        errs,
        isValid :isEmpty(errs)
    };
};