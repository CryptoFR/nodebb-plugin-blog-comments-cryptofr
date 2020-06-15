import { authXHR,signUpXHR,XHR,pagination} from "../settings.js";
import { removeLoader } from "./util.js"; 
import { reloadComments } from "./comments/loadComments.js"; 
import { drawComments,createSnackbar } from "./comments/drawComments.js";

  export function onloadXHR(){

    /**
     * onload handler for the authXHR variable. It creates a toast
     * with a message of login success or failed within it
     */
    authXHR.onload = function() {
      if (authXHR.status === 200) {
        reloadComments(pagination,0,false);
        setTimeout(function() {
          removeLoader();
          createSnackbar("Login success", true);
        }, 1500);
      } else {
        removeLoader();
        createSnackbar("Login failed", false);
      }
    };

    /**
     * Callback that is fired when a signup is processed
     */
    signUpXHR.onload = function signUpXHROnload() {
      function onRegisterFailed() {
        removeLoader();
        createSnackbar("Register failed", false);
      }
      if (signUpXHR.status === 200) {
        var response = JSON.parse(signUpXHR.responseText);
        if (!response.error) {
          reloadComments(pagination,0,false);
          setTimeout(function() {
            removeLoader();
            createSnackbar(
              "Merci de confirmer votre inscription via le lien envoyé à votre email",
              true
            );
          }, 1500);
        } else {
          onRegisterFailed();
        }
      } else {
        onRegisterFailed();
      }
    };

    /**
     * Callback for global XHR variable, it draws all the data on the DOM
     */
    XHR.onload = drawComments;
  }
 