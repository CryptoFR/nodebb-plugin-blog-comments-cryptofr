
	
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
	function closeModal() {
	  var modalElement = document.querySelector("div.modal[data-closed='0']");
	  if (modalElement) {
	    modalElement.setAttribute("data-closed", "1");
	    modalElement.style.display = "none";
	  }
	}


	/**
	 * Function that starts the authentication process
	 * this process is finished whenever any of the two modals
	 * that can be opened with it (login or register) are closed
	 * either by a login completion or another action of the user
	 * when this happens, comments are reloaded
	 * @param {("login"|"register")} type the type of the authentication
	 */
	function authenticate(type) {
	  savedText = contentDiv.value;
	  var modal = openModal(type);
	  var timer = setInterval(function() {
	    if (modal.getAttribute("data-closed") === "1") {
	      clearInterval(timer);
	      pagination = 0;
	      reloadComments();
	    }
	  }, 500);
	}


	
	/**
	 * Opens a modal within the plugin
	 * @param {("login"|"register")} type whether the modal is login or register
	 * @returns {DOMElement} The modal element
	 */
	function openModal(type) {
	  var modalSelector = type === "login" ? "#login-modal" : "#register-modal";
	  var modalElement = document.querySelector(modalSelector);
	  if (modalElement.getAttribute("data-closed") === "0") {
	    return modalElement;
	  }
	  modalElement.style.display = "block";
	  modalElement.setAttribute("data-closed", "0");
	  return modalElement;
	}