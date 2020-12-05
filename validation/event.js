const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.organization = !isEmpty(data.organization) ? data.organization : "";
    data.headline = !isEmpty(data.headline) ? data.headline : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.date = !isEmpty(data.date) ? data.date : "";
    data.time = !isEmpty(data.time) ? data.time : "";
    data.place = !isEmpty(data.place) ? data.place : "";

    
    if (Validator.isEmpty(data.organization)) {
        errors.organization = "Organization field is required";
    }

    
    if (Validator.isEmpty(data.headline)) {
        errors.headline = "Title field is required";
    }

   
    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    }

    if (Validator.isEmpty(data.date)) {
      errors.date = "Date field is required";
    }

    if (Validator.isEmpty(data.time)) {
      errors.time = "Time field is required";
    }

    if (Validator.isEmpty(data.place)) {
      errors.place = "Location field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};