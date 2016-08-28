module.exports = (function() {
  var form;

  for (var i = 0; i < document.forms.length; i++) {
    form = document.forms[i];

    form.noValidate = true;

    form.addEventListener('submit', function(e) {
      if (!this.classList.contains('submission-attempt')) {
        this.classList.add('submission-attempt');
      }

      if (!this.checkValidity()) {
        e.preventDefault();
      }
    });
  }
})();