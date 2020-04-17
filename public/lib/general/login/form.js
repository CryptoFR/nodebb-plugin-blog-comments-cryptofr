   /**
   * Add "blur" events that will validate the register form
   * @param {DOMElement} modal modal element
   */
  export function addRegisterValidators(modal) {
    var email = modal.querySelector("input[name='email']");
    var emailErrors = modal.querySelector("div.email-errors");
    email.addEventListener("blur", function emailBlurListener() {
      var url =
        nodeBBURL +
        "/comments/plugin/email?email=" +
        encodeURIComponent(email.value);
      fetch(url)
        .then(function(res) {
          return res.json();
        })
        .then(function(json) {
          if (!json.errors && !json.results.available) {
            emailErrors.innerText = "The email is taken";
          } else {
            emailErrors.innerText = "";
          } 
        });
    });

    var username = modal.querySelector("input[name='username']");
    var usernameErrors = modal.querySelector("div.username-errors");
    username.addEventListener("blur", function emailBlurListener() {
      var url =
        nodeBBURL +
        "/comments/plugin/username?username=" +
        encodeURIComponent(username.value);
      fetch(url)
        .then(function(res) {
          return res.json();
        })
        .then(function(json) {
          if (!json.errors && json.results.exists) {
            usernameErrors.innerText = "The username is taken";
          } else {
            usernameErrors.innerText = "";
          }
        });
    });
  }