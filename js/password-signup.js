(function() {
  var password = document.getElementById('password');
  var passwordConfirm = document.getElementById('conf-password');
  function setErrorHighlighter(e) {
    var target = e.target || e.srcElement;
    if (target.value.length < 8) {
      target.className = 'fail';
    } else {
      target.className = 'pass';
    }
  }
}());
