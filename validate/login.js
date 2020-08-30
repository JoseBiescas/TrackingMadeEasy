const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
    let errs = {};

    //empty fields are converted into empty strings.
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Check email
    if (Validator.isEmpty(data.email)) {
        errs.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errs.email = "Email is invalid";
    }

    //Check password
    if (Validator.isEmpty(data.password)) {
        errs.password = "Password field is required";
    }

    return {
        errs,
        isValid: isEmpty(errs)
    };
};