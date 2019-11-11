import { reloadComments } from "../comments/loadComments.js"; 	
import { closeModal } from "./modal.js";   

	/**
   * Callback that's fired whenever a Facebook, Twitter or Github button is clicked for login
   * @param {MouseEvent} event
   */
  export function onClickSocialAuth(event) {
    event.preventDefault();
    var t = event.target;
    console.log(event)
    console.log(t)
    console.log(t.getAttribute("data-link"))
    console.log(t.getAttribute("data-network"))
    var w = window.open(
      t.getAttribute("data-link"),
      t.getAttribute("data-network"),
      "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"
    );
    var interval = setInterval(function checkSocialAuth() {
      if (w === null || w.closed === true) {
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
