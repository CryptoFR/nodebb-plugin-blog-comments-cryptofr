import { reloadComments } from "../comments/loadComments.js"; 	

	/**
   * Callback that's fired whenever a Facebook, Twitter or Github button is clicked for login
   * @param {MouseEvent} event
   */
  export function onClickSocialAuth(event) {
    var t = event.target;
    var w = window.open(
      t.getAttribute("data-link"),
      t.getAttribute("data-network"),
      "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"
    );
    var interval = setInterval(function checkSocialAuth() {
      if (w === null || w.closed === true) {
        reloadComments();
        setTimeout(closeModal, 1000);
        clearInterval(interval);
      }
    }, 1000);
  }

  /**
   * Function that adds social auth link listeners
   * @param {DOMElement} modal modal element
   */
  export function addSocialAuthListeners(modal) {
    var links = modal.querySelectorAll("a[data-link]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      a.addEventListener("click", onClickSocialAuth);
    }
  }
