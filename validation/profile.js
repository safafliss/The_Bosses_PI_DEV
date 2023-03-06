const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateProfile(data) {
  let errors = {};

  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  
  if (validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "Required phoneNumber";
  }
  

  return {
      errors,
      isValid: isEmpty(errors)
  }
};