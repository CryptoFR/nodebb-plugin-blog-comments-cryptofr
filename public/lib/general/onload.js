import { set,dataRes,page,pluginURL,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates } from "../settings.js";
import { bindOnClick,removeLoader,addTimeAgoRecursive,timeAgo,normalizePost } from "./util.js"; 
import { prepareModal,onSubmitLogin,onSubmitSignUp,authenticate } from "./login/modal.js"; 
import { addSocialAuthListeners } from "./login/social.js"; 
import { addRegisterValidators } from "./login/form.js"; 
import { reloadComments,createSnackbar } from "./comments/loadComments.js"; 
import { setActiveSortingLi,setSorting } from "./comments/sortComments.js"; 
import { upvotePost,downvotePost,xpost } from "./api.js";
import { drawComments } from "./comments/drawComments.js";

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

  /**
  * Creates an auxiliary function that's used for some XHR request objects as onload callback
  * @param {XMLHttpRequest} xhr request object
  * @returns {Function} onload handler
  */
  export function onLoadFunction(xhr) {
    setTimeout(function() {
      return function onLoadImpl() {
       xhr.isBusy = false;
       console.log("reloading because aja")

       reloadComments(pagination,0,false);
      }
    }, 500);
  }