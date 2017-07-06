(function() {
  document.forms.register.noValidate = true;
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

    
  });
}());
