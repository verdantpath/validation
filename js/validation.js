(function() {
  document.forms.register.noValidate = true; // disable HTML5 validation using JavaScript instead to make it consistent among browsers

  // A

  // CHECKED AND WORKING
  $('form').on('submit', function(e) {
    var elements = this.elements; // Collection of form controls
    var valid = {}; // Keeps track of each form control being valid or not
    var isValid; // flag to check if individual elements are valed
    var isFormValid; // flag to check if whole form is valid

    // generic checks
    var i;
    for (i = 0, l = elements.length; i < l; i++) { // loop through each form control
      isValid = validateRequired(elements[i]) && validateTypes(elements[i]); // is the element required / does it have a value? Does the value correspond with the type?
      if (!isValid) {
        showErrorMessage(elements[i]);
      } else {
        removeErrorMessage(elements[i]);
      }
      valid[elements[i].id] = isValid; // add element to the valid object
    }

    // custom validation
    if (!validateBio()) { // is the bio too long?
      showErrorMessage(document.getElementById('bio'));
      valid.bio = false;
    } else {
      removeErrorMessage(document.getElementById('bio'));
    }

    if (!validatePassword()) {
      showErrorMessage(document.getElementById('password'));
      valid.password = false;
    } else {
      removeErrorMessage(document.getElementById('password'));
    }

    if (!validateParentsConsent()) {
      showErrorMessage(document.getElementById('parents-consent'));
      valid.parentsConsent = false;
    } else {
      removeErrorMessage(document.getElementById('parents-consent'));
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

  // B

  // CHECKED AND WORKING
  // functions for generic checks
  // check if the field is required and if so does it have a value?
  function validateRequired(el) {
    if (isRequired(el)) { // does this element contain a required attribute?
      var valid = !isEmpty(el); // is the value of the element empty?
      if (!valid) { // if valid variable is false
        setErrorMessage(el, 'Field is required'); // if valid is false an error message is set
      }
      return valid; // the valid variable is returned (true / false) and the function ends
    }
    return true;
  }

  // check if the element is required (called by validateRequired)
  function isRequired(el) {
    return ((typeof el.required === 'boolean') && el.required) ||
      (typeof el.required === 'string');
  }

  // check if the element is empty, or value is the same as placeholder
  function isEmpty(el) {
    return !el.value || el.value === el.placeholder;
  }

  function validateTypes(el) {
    if (!el.value) return true; // if element has no value return true and exit function
    var type = $(el).data('type') || el.getAttribute('type'); // get the type of input
    if (typeof validateType[type] === 'function') { // is type a method of validate object?
      return validateType[type](el); // if yes check if the value validates
    } else {
      return true; // return true as it cannot be tested
    }
  }

  // C

  // CHECKED AND WORKING
  // functions for custom validation
  // if user is less than 13 years old, check that parents consent checkbox is checked (dependency birthday.js)
  function validateParentsConsent() {
    var parentsConsent = document.getElementById('parents-consent');
    var consentContainer = document.getElementById('consent-container');
    var valid = true;
    if (consentContainer.className.indexOf('hide') === -1) { // if checkbox shown
      valid = parentsConsent.checked;
      if (!valid) {
        setErrorMessage(parentsConsent, 'You need your parent\'s consent'); // if not set the error message
      }
    }
    return valid; // return whether valid or not
  }

  // check if the bio is less than or equal to 140 characters
  function validateBio() {
    var bio = document.getElementById('bio');
    var valid = bio.value.length <= 140;
    if (!valid) {
      setErrorMessage(bio, 'Please make sure your bio does not exceed 140 characters');
    }
    return valid;
  }

  // check that the passwords are 8 or more characters
  function validatePassword() {
    var password = document.getElementById('password');
    var valid = password.value.length >= 8;
    if (!valid) {
      setErrorMessage(password, 'Please make sure your password has at least 8 characters');
    }
    return valid;
  }

  // D

  //  CHECKED AND WORKING
  function setErrorMessage(el, message) {
    $(el).data('errorMessage', message);
  }

  function getErrorMessage(el) {
    return $(el).data('errorMessage') || el.title;
  }

  function showErrorMessage(el) {
    var $el = $(el);
    var errorContainer = $el.siblings('.error.message');
    if (!errorContainer.length) {
      errorContainer = $('<span class="error message"></span>').insertAfter($el);
    }
    errorContainer.text(getErrorMessage(el));
  }

  function removeErrorMessage(el) {
    var errorContainer = $(el).siblings('.error.message');
    errorContainer.remove();
  }

  // E

  //CHECKED AND WORKING
  // object for checking types
  var validateType = {
    email: function (el) {
      var valid = /[^@]+@[^@]+/.test(el.value);
      if (!valid) {
        setErrorMessage(el, 'Please enter a valid email');
      }
      return valid;
    },
    number: function (el) {
      var valid = /^\d+$/.test(el.value);
      if (!valid) {
        serErrorMessage(el, 'Please enter a vaild number');
      }
      return valid;
    },
    date: function (el) {
      var valid = /^(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(el.value);
      if (!valid) {
        setErrorMessage(el, 'Please enter a valid date');
      }
      return valid;
    }
  };

}());
