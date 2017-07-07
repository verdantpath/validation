(function() {
  document.forms.register.noValidate = true; // disable HTML5 validation using JavaScript instead to make it consistent among browsers
  $('form').on('submit', function(e) {
    var elements = this.elements; // Collection of form controls
    var valid = {}; // Keeps track of each form control being valid or not
    var isValid; // flag to check if individual elements are valed
    var isFormValid; // flag to check if whole form is valid

    // generic checks
    for (var i = 0; l = (elements.length - 1); i < l; i++) { // loop through each form control
      isValid = validateRequired(elements[i]) && validateTypes(elements[i]); // is the element required / does it have a value? Does the value correspond with the type?
      if (!isValid) {
        showErrorMessage(elements[i]);
      } else {
        removeErrorMessage(elements[i]);
      }
      valid[elements[i].id] = isVaild; // add element to the valid object
    }

    // custom validation
    if (!validateBio()) { // is the bio too long?
      showErrorMessage(document.getElementById('bio'));
      valid.bio = false;
    } else {
      removeErrorMessage(document.getElementById('bio'));
    }

    // did it pass validation and can the form be submitted?
    // loop through the valid object, if there are any errors set isFormValid to false
    for (var field in valid) { // loop through each property in the valid object
      if (!valid[field]) { // if the form control / field is not valid
        isFormValid = false; // the form is not valid
        break; // stops the loop because an something is not valid
      }
      isFormValid = true; // form is valid and is ok to submit
    }
    // if the form did not pass validation, prevent it from submitting
    if (!isFormValid) { // if isFormValid is false
      e.preventDefault();
    }
  });

  // functions for generic checks
  // check if the field is required and if so does it have a value?
  function validateRequired(el) {
    if (isRequired(el)) { // does this element contain a required attribute?
      var valid = !isEmpty(el); // is the value of the element empty?
      if (!valid) { // if valid variable is false
        setErrorMessage(el, 'Field is required'); // if valid is false an error message is set
      }
      return valid;
    }
    return true;
  }

}());
