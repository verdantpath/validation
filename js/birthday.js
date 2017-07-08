(function() {
  var $birth = $('#birthday');
  var $parentsConsent = $('#parents-consent');
  var $consentContainer = $('#consent-container');

  // create the date picker using jquery ui
  $birth.prop('type', 'text').data('type', 'date').datepicker({
    dateFormat: 'yy-mm-dd'
  });
  $birth.on('blur change', checkDate);
  function checkDate() {
    var dob = this.value.split('-');
    // pass toggleParentsConsent function the birthday as a date object
    toggleParentsConsent(new Date(dob[0], dob[1] -1, dob[2]));
  }
  function toggleParentsConsent(date) {
    if (isNan(date)) return;
  }
}());
