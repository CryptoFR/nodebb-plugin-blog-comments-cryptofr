

  /**
   * Bind on Click event for nodeList
   * @param {Array<DOMElement>} nodeList nodes for with the click event will be added
   * @param {Function} handler a handler
   */
  export var bindOnClick = function(nodeList, handler) {
    for (var i = nodeList.length - 1; i >= 0; i--) {
      nodeList[i].onclick = handler;
    }
  };

  

  /**
   * Function called to set up values on the modal
   * @param {string} modalTemplate HTML code for the modal
   * @param {string} token CSRF token
   * @param {function} onSubmit function to be called when a submit event occurs
   * @returns {DOMElement} Modal's div element
   */
  export function prepareModal(modalTemplate, token, onSubmit) {
    var div = document.createElement("div");
    div.innerHTML = modalTemplate;
    div.querySelector("span.modal-close").onclick = closeModal;
    var form = div.querySelector("form");
    form.onsubmit = onSubmit;
    form.setAttribute("action", nodeBBURL + "/login");
    form.querySelector("input[name='_csrf']").setAttribute("value", token);
    return div;
  }


  /**
   * Function called when the sign up form is submitted
   * @param {HTMLInputElement} e event information
   */
  export function onSubmitSignUp(e) {
    e.preventDefault();
    var t = e.target;
    var username = t.querySelector("input[name='username']").value;
    var email = t.querySelector("input[name='email']").value;
    var password = t.querySelector("input[name='password']").value;
    var passwordConfirm = t.querySelector("input[name='password-confirm']")
      .value;
    var checkedTerms = t.querySelector("input[name='terms']").checked;
    var token = t.querySelector("input[name='_csrf']").value;
    signUp(username, email, password, passwordConfirm, token, checkedTerms);
    setTimeout(closeModal, 500);
  }

  /**
   * Function called when the login form is submitted
   * @param {HTMLInputElement} e event information
   */
  export function onSubmitLogin(e) {
    e.preventDefault();
    var t = e.target;
    login(
      t.querySelector("input[name='email']").value,
      t.querySelector("input[name='password']").value,
      t.querySelector("input[name='_csrf']").value
    );
    setTimeout(closeModal, 500);
  }


  /**
   * Closes whatever modal is opened within the plugin
   */
  export function closeModal() {
    var modalElement = document.querySelector("div.modal[data-closed='0']");
    if (modalElement) {
      modalElement.setAttribute("data-closed", "1");
      modalElement.style.display = "none";
    }
  }