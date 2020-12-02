const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateOrgRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.orgName = !isEmpty(data.orgName) ? data.orgName : "";
    data.orgUser = !isEmpty(data.orgUser) ? data.orgUser : "";
    data.orgPass = !isEmpty(data.orgPass) ? data.orgPass : "";

    // Name checks
    if (Validator.isEmpty(data.orgName)) {
        errors.orgName = "Name field is required";
    }

    // Email checks
    if (Validator.isEmpty(data.orgUser)) {
        errors.orgUser = "Email field is required";
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