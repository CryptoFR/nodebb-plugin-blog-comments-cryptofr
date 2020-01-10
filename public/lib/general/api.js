import { set,pluginURL,commentXHR,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates } from "../settings.js";
import { addLoader } from "./util.js";
import { grecaptchaGrab } from "./login/modal.js"; 
import { reloadComments } from "./comments/loadComments.js"; 
  /**
   * Creates an XHR request. This function due to the use of the
   * global variable XHR can be a source of bugs
   * @fixme
   * @returns {XMLHttpRequest} xhr request
   */
   export function newXHR() {
    try {
      set.XHR(new XMLHttpRequest());
      return XHR;
    } catch (e) {
      try { 
          set.XHR(new ActiveXObject("Microsoft.XMLHTTP"))
          return XHR;
      } catch (e) { 
          set.XHR(new ActiveXObject("Msxml2.XMLHTTP"));
          return XHR;
      }
    }
  }

  /**
   * Same function as before but without the use of a global variable
   * @note this was only used for new requests
   * @returns {XMLHttpRequest} request
   */
   export function newXHRFixed() {
    try {
      return new XMLHttpRequest();
    } catch (e) {
      try {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        return new ActiveXObject("Msxml2.XMLHTTP");
      }
    }
  }

  /**
   * Function that creates a new GET request
   * @param {XMLHttpRequest} xhr request object
   * @param {string} path URL to be queried
   * @returns {XMLHttpRequest} the request object
   */
   export function xget(xhr, path) {
    xhr.open("GET", path, true);
    xhr.withCredentials = true;
    xhr.send();
    return xhr;
  }

  /**
   * Function that creates and sends a new POST request
   * @param {XMLHttpRequest} xhr request object
   * @param {string} path URL to be queried
   * @param {Object} data data that's going to be included in the post request
   * @returns {XMLHttpRequest} the request object
   */
   export function xpost(xhr, path, data) {
    var encodedString = "";
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        if (encodedString.length > 0) {
          encodedString += "&";
        }
        encodedString +=
          encodeURIComponent(prop) + "=" + encodeURIComponent(data[prop]);
      }
    }
    xhr.open("POST", path, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(encodedString);
    return xhr;
  }

  function newFetch(path, data) {
    var encodedString = "";
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        if (encodedString.length > 0) {
          encodedString += "&";
        }
        encodedString +=
          encodeURIComponent(prop) + "=" + encodeURIComponent(data[prop]);
      }
    }
    return fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
      body: encodedString
    })
  }



  /**
   * Upvotes a comment
   * @param {DOMElement} topicItem DOMElement for the comment
   * @param {Number} pid post (comment) ID
   * @param {Boolean} upvoted Whether the comment has been already upvoted or not
   */
   export function upvotePost(topicItem, pid, upvoted) {
    var isUpvote = !upvoted;
    // if (voteXHR.isBusy) return;
    var voteXHRaux= voteXHR;
    voteXHRaux.isBusy = true;
    voteXHRaux.topicItem = topicItem;
    set.voteXHR(voteXHRaux);
    return newFetch(nodeBBURL + "/comments/vote", {
      toPid: pid,
      isUpvote: isUpvote
    });
  }

  /**
   * Creates a login request
   * @param {string} username username or email for the request
   * @param {string} password
   * @param {string} token CSRF token for the request
   */
   export function login(username, password, token) {
    if (authXHR.isBusy) return;
    var authXHRaux= authXHR;
    authXHRaux.isBusy = true;
    set.authXHR(authXHRaux);
    xpost(authXHR, nodeBBURL + "/login", {
      username: username,
      password: password,
      _csrf: token,
      remember: "on",
      noscript: false
    });
    addLoader();
  }
  
  /**
   * Creates a signup request
   * @param {string} username username for the request
   * @param {string} email email for the request
   * @param {string} password password for the request
   * @param {string} passwordConfirm username for the request
   * @param {string} token CSRF token for the request
   * @param {boolean} checkedTerms whether terms of use were checked or not
   */
   export function signUp(username,email,password,passwordConfirm,token,checkedTerms) {
    if (signUpXHR.isBusy) return;
    var signUpXHRaux= signUpXHR;
    signUpXHRaux.isBusy = true;
    set.signUpXHR(signUpXHRaux);
    xpost(signUpXHR, nodeBBURL + "/comments/plugin/register", {
      username: username,
      password: password,
      email: email,
      "password-confirm": passwordConfirm,
      _csrf: token,
      userLang: "fr",
      referrer: "",
      token: "",
      noscript: false,
      terms: checkedTerms,
      captcha: window.grecaptcha.getResponse(renderedCaptcha)
    });
    addLoader();
  }



  /**
   * Downvotes a comment
   * @param {DOMElement} topicItem DOMElement for the comment
   * @param {Number} pid post (comment) ID
   * @param {Boolean} downvoted Whether the comment has been already downvoted or not
   */
   export function downvotePost(topicItem, pid, downvoted) {
    var isDownvote = !downvoted;
    // if (voteXHR.isBusy) return;
    var voteXHRaux= voteXHR;
    voteXHRaux.isBusy = true;
    voteXHRaux.topicItem = topicItem;
    set.voteXHR(voteXHRaux)
    return newFetch(nodeBBURL + "/comments/downvote", {
      toPid: pid,
      isDownvote: isDownvote
    });
  }

  /**
   * Bookmarks a comment
   * @param {DOMElement} topicItem DOMElement for the comment
   * @param {Number} pid post (comment) ID
   * @param {Boolean} bookmarked Whether the comment has been already bookmarked or not
   */
   export function bookmarkPost(topicItem, pid, bookmarked) {
    if (voteXHR.isBusy) return;
    var voteXHRaux= voteXHR;
    voteXHRaux.isBusy = true;
    voteXHRaux.topicItem = topicItem;
    voteXHRaux.isBookmark = !bookmarked;
    set.voteXHR(voteXHRaux)
    return newFetch(nodeBBURL + "/comments/bookmark", {
      toPid: pid,
      isBookmark: !bookmarked
    });
  }


  /**
   * Deletes a comment
   * @param {DOMElement} topicItem DOMElement for the comment
   * @param {Number} pid post (comment) ID
   * @param {Boolean} bookmarked Whether the comment has been already bookmarked or not
   */
  export function deletePost(topicItem, pid) {
    var voteXHRaux= voteXHR;
    voteXHRaux.isBusy = true;
    voteXHRaux.topicItem = topicItem;
    set.voteXHR(voteXHRaux)
    return newFetch(voteXHR, nodeBBURL + "/comments/delete/" + pid);
  }



   export function logout(token) {
    if (authXHR.isBusy) return;
    var authXHRaux= authXHR;
    authXHRaux.isBusy = true;
    set.authXHR(authXHRaux);
    xpost(authXHR, nodeBBURL + "/logout", {
      _csrf: token,
      noscript: false
    });
    addLoader();
  }