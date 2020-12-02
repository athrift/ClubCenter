const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateOrgLoginInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.orgUser = !isEmpty(data.orgUser) ? data.orgUser : "";
    data.orgPass = !isEmpty(data.orgPass) ? data.orgPass : "";

    // Email checks
    if (Validator.isEmpty(data.orgUser)) {
        errors.orgUser = "Username field is required";
    }

    // Password checks
    if (Validator.isEmpty(data.orgPass)) {
        errors.orgPass = "Password field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};