import { set,pluginURL,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates } from "../../settings.js";
import { reloadComments } from "../comments/loadComments.js"; 
import { login,signUp } from "../api.js"; 

	
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
	  setTimeout(closeModal, 100);
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
	  reloadComments();
	}


	/**
	 * Function that starts the authentication process
	 * this process is finished whenever any of the two modals
	 * that can be opened with it (login or register) are closed
	 * either by a login completion or another action of the user
	 * when this happens, comments are reloaded
	 * @param {("login"|"register")} type the type of the authentication
	 */
	export function authenticate(type) {
	  set.savedText(contentDiv.value);
	  var modal = openModal(type);
	  var timer = setInterval(function() {
	    if (modal.getAttribute("data-closed") === "1") {
	      clearInterval(timer);
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


	export function grecaptchaGrab() {
    if (window.grecaptcha && typeof window.grecaptcha.ready === "function") {
      window.grecaptcha.ready(function() {
        var interval = setInterval(renderCallback, 1000);
        function renderCallback() {
          var container = document.getElementById("google-callback");
          if (container) {
            set.renderedCaptcha(window.grecaptcha.render(container, {
              sitekey: "6LcL2LEUAAAAANP2M8PsNoMotoiFBlFApE5pIX0y"
            }));
            clearInterval(interval);
          }
        }
        renderCallback();
      });
    } else {
      setTimeout(grecaptchaGrab, 1000);
    }
  }