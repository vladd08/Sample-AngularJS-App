const FormValidator = {
  isFieldValid: (form, fieldname) => {
    return form[fieldname].$invalid && form[fieldname].$touched;
  },
  isFormValid: form => {
    return form.$invalid;
  }
};

export default FormValidator;
