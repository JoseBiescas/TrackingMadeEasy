/*
card.js (validator)

Checks whether the inputs are valid.

Returns:
    errors: (dictionary) containing any errors.
    isValid: (boolean) checks if we have any errors or not.
*/

const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCardInput(data) {
    let errors = {};

    //empty fileds are converted to empty strings
    data.title = !isEmpty(data.title) ? data.title : "";

    //Check title
    if (Validator.isLength(data.title, {min: 3, max: 40})) {
        errors.title = "Title field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};