import { reloadComments } from "../comments/loadComments.js"; 	
import { closeModal } from "./modal.js";   


  /**
   * Function that adds social auth link listeners
   * @param {DOMElement} modal modal element
   */
  export function addSocialAuthListeners(modal) {
    for (let socialLink of modal.querySelectorAll("a[data-link]")) {
      socialLink.addEventListener('click', function(event){

        event.preventDefault();
        
        var w = window.open(
          this.getAttribute("data-link"),
          this.getAttribute("data-network"),
          "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"
        );
        var interval = setInterval(function checkSocialAuth() {
          if (w === null || w.closed === true) {
            setTimeout(closeModal, 1000);
            clearInterval(interval);
          }
        }, 1000);

      });
    
  }
}
