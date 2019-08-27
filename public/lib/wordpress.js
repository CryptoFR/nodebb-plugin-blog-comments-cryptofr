/**
 * @fileOverview Wordpress plugin file. Needs to be included in order to use the plugin
 * This file uses the following global variables:
 * - nodeBBURL: The URL of the NodeBB forum
 * @name wordpress.js
 */
(function() {
  "use strict";

  var postTemplate, wholeTemplate;

  /**
   * Called whenever a comment is bookmarked
   * @param {DOMElement} topicItem A DOM element with the comment data
   * @param {Boolean} isBookmark whether the comment is going to be bookmarked or not
   */
  function onBookmarked(topicItem, isBookmark) {
    var el = topicItem.querySelector(".i-bookmark");
    var link = topicItem.querySelector('[data-component="post/bookmark"]');
    if (isBookmark) {
      el.classList.add("icon-bookmark");
      el.classList.remove("icon-bookmark-empty");
      link.setAttribute("data-bookmarked", true);
    } else {
      el.classList.remove("icon-bookmark");
      el.classList.add("icon-bookmark-empty");
      link.setAttribute("data-bookmarked", false);
    }
  }

  /**
   * Function that changes a single attribute to a group of DOM Elements
   * @param {Array<DOMElement> | DOMElement} elements the group of elements
   * @param {String} attribute the attribute to change
   * @param {String} value the value we are going to assign to these elements
   */
  function changeAttribute(elements, attribute, value) {
    elements = elements.length !== undefined ? elements : [elements];
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el !== null) {
        el.setAttribute(attribute, value);
      }
    }
  }

  /**
   * Toggle class helper. It tests "value" and if true, the helper adds the "classTrueValue" string to the element
   * otherwise it adds the "classFalseValue"
   * @param {DOMElement} element
   * @param {any} value this value will be coerced to Boolean
   * @param {String} classTrueValue
   * @param {String} classFalseValue
   */
  function addClassHelper(element, value, classTrueValue, classFalseValue) {
    var classToAdd = value ? classTrueValue : classFalseValue;
    var classToRemove = !value ? classTrueValue : classFalseValue;
    if (element === null) {
      return;
    }
    if (element.classList.contains(classToRemove)) {
      element.classList.remove(classToRemove);
    }
    element.classList.add(classToAdd);
  }

  /**
   * Helper function that removes an array of nodes or a single node from the DOM tree
   * @param {DOMElement | Array<DOMElement>} nodes
   */
  function removeNodes(nodes) {
    var nodeList = nodes.length !== undefined ? nodes : [nodes];
    var len = nodeList.length;
    for (var i = 0; i < len; i++) {
      var node = nodeList[i];
      node.parentNode.removeChild(node);
    }
  }
  /**
   * Function that draws nested comments
   * @param {Array} comments comments data
   * @param {DOMElement} template comment template
   * @param {Object} otherData Data to be rendered within the comments that's not the comments themselves
   * @returns {DOMElement} A node with the nested comments already drawn
   */
  function createNestedComments(comments, template, otherData) {
    var tid = otherData.tid;
    var token = otherData.token;
    var redirectURL = otherData.redirect_url;
    var relativePath = otherData.relative_path;
    var uid = otherData.user.uid;
    function changeFormValue(comment, form, level, url) {
      if (form.classList.contains("sub-reply-input")) {
        form.setAttribute("action", relativePath + "/comments/reply");
      } else {
        form.setAttribute(
          "action",
          relativePath + "/comments/edit/" + form.getAttribute("data-pid")
        );
      }
      changeAttribute(
        form.querySelectorAll('input[name="_csrf"]'),
        "value",
        token
      );
      changeAttribute(form.querySelectorAll('input[name="tid"]'), "value", tid);
      changeAttribute(
        form.querySelectorAll('input[name="url"]'),
        "value",
        redirectURL
      );
      var toPid = level >= 2 ? comment.toPid : comment.pid;
      changeAttribute(
        form.querySelectorAll('input[name="toPid"]'),
        "value",
        toPid
      );
    }

    /**
     * Function that actually creates the comment, we use this as helper
     * in order to use recursion and take advantage of closures with the
     * template variable
     * @param {Object} comment the comment
     * @param {Number} level nesting level of the comment, if it's first order it'll be 1 and so forth
     * @returns {DOMElement} returns nested comments
     */
    function createNestedCommentsInternal(comment, level) {
      var clone = template.cloneNode(true);
      // Here we should manipulate the node
      clone.setAttribute("data-pid", comment.pid);
      clone.querySelector("div.topic-item").setAttribute("data-level", level);
      clone
        .querySelector("span.user-status")
        .classList.add(comment.user.status);
      changeAttribute(
        clone.querySelectorAll("[data-pid]"),
        "data-pid",
        comment.pid
      );
      changeAttribute(
        clone.querySelectorAll("[data-uid]"),
        "data-uid",
        comment.uid
      );
      changeAttribute(
        clone.querySelectorAll("[data-userslug]"),
        "data-userslug",
        comment.user.userslug
      );
      changeAttribute(
        clone.querySelectorAll("[data-bookmarked]"),
        "data-bookmarked",
        comment.bookmarked
      );
      changeAttribute(
        clone.querySelectorAll("[data-upvoted]"),
        "data-upvoted",
        comment.upvoted
      );
      changeAttribute(
        clone.querySelectorAll("[data-downvoted]"),
        "data-downvoted",
        comment.downvoted
      );
      changeAttribute(
        clone.querySelectorAll("[data-votes]"),
        "data-votes",
        comment.votes
      );
      var forms = clone.querySelectorAll("form");
      forms.forEach(f => changeFormValue(comment, f, level));
      var upvoteCountEl = clone.querySelector("span.upvote-count");
      if (comment.votes) {
        upvoteCountEl.classList.remove("hidden");
        upvoteCountEl.innerText = comment.votes;
      } else {
        upvoteCountEl.classList.add("hidden");
      }
      clone.querySelector("span.post-value").innerText = "" + comment.votes;
      clone.querySelector("button[data-reply-button]").innerText =
        "Répondre à " + comment.user.username;
      addClassHelper(
        clone.querySelector("i.i-upvote"),
        comment.upvoted,
        "icon-thumbs-up-alt",
        "icon-thumbs-up"
      );
      addClassHelper(
        clone.querySelector("i.i-bookmark"),
        comment.bookmarked,
        "icon-bookmark",
        "icon-bookmark-empty"
      );
      addClassHelper(
        clone.querySelector("i.i-downvote"),
        comment.downvoted,
        "icon-thumbs-down-alt",
        "icon-thumbs-down"
      );
      clone.querySelector("div.post-body").innerHTML = comment.content;
      var img = clone.querySelector("img.profile-image");
      var divImgText = clone.querySelector("div.profile-image");
      if (comment.user.picture) {
        changeAttribute(img, "src", comment.user.picture);
        changeAttribute(img, "alt", comment.user.username);
        changeAttribute(img, "title", comment.user.username);
        removeNodes(divImgText);
      } else {
        changeAttribute(divImgText, "title", comment.user.username);
        changeAttribute(divImgText, "alt", comment.user.username);
        if (divImgText) {
          divImgText.innerText = comment.user["icon:text"];
          divImgText.style.backgroundColor = comment.user["icon:bgColor"];
        }
        removeNodes(img);
      }
      clone.querySelector("strong[data-strong-username]").innerText =
        comment.user.username;
      if (comment.parent && comment.parent.username) {
        clone.querySelector("span[data-parent-username]").innerText =
          "@" + comment.parent.username;
        // We update here because in another method timestamps are updated for parent comments
        if (typeof comment.timestamp === "number") {
          comment.timestamp = timeAgo(parseInt(comment.timestamp, 10));
        }
      } else {
        removeNodes(clone.querySelector("button.reply-label"));
      }
      if (comment.uid !== uid) {
        removeNodes(clone.querySelector("a.edit"));
      }
      clone.querySelector("span[data-timestamp]").innerText =
        "commented " + comment.timestamp;
      if (uid === comment.user.uid) {
        var toRemoveAnchors = clone.querySelectorAll(
          'a[data-component="post/upvote"], a[data-component="post/downvote"]'
        );
        for (var i = 0; i < toRemoveAnchors.length; i++) {
          removeNodes(toRemoveAnchors[i]);
        }
      }
      // Finish manipulation
      if (comment.children && level <= 2) {
        var ul = document.createElement("ul");
        for (var i = 0; i < comment.children.length; i++) {
          var el = comment.children[i];
          ul.appendChild(createNestedCommentsInternal(el, level + 1));
        }
        clone.append(ul);
      }
      return clone;
    }
    var retVal = document.createElement("div");
    for (var i = 0; i < comments.length; i++) {
      retVal.appendChild(createNestedCommentsInternal(comments[i], 0));
    }
    return retVal;
  }

  /**
   * Bind on Click event for nodeList
   * @param {Array<DOMElement>} nodeList nodes for with the click event will be added
   * @param {Function} handler a handler
   */
  var bindOnClick = function(nodeList, handler) {
    for (var i = nodeList.length - 1; i >= 0; i--) {
      nodeList[i].onclick = handler;
    }
  };
  var articlePath =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;

  var pluginURL = nodeBBURL + "/plugins/nodebb-plugin-blog-comments-cryptofr",
    savedText,
    nodebbDiv,
    contentDiv,
    commentsDiv,
    commentsCounter,
    commentsAuthor,
    commentsCategory;

  var stylesheet = document.createElement("link");
  stylesheet.setAttribute("rel", "stylesheet");
  stylesheet.setAttribute("type", "text/css");
  stylesheet.setAttribute("href", pluginURL + "/css/comments.css");
  var stylesheetCryptoFR = document.createElement("link");
  stylesheetCryptoFR.setAttribute("rel", "stylesheet");
  stylesheetCryptoFR.setAttribute("type", "text/css");
  stylesheetCryptoFR.setAttribute("href", pluginURL + "/css/cryptofr.css");
  document.getElementsByTagName("head")[0].appendChild(stylesheet);
  document.getElementsByTagName("head")[0].appendChild(stylesheetCryptoFR);
  document
    .getElementById("nodebb-comments")
    .insertAdjacentHTML(
      "beforebegin",
      '<div class="comments-area" id="nodebb"></div>'
    );
  nodebbDiv = document.getElementById("nodebb");
  /**
   * This variable will grab a captcha that will then be rendered in the page
   * @type {DOMElement}
   */
  var renderedCaptcha;

  /**
   * Renders a captcha
   */
  function grecaptchaGrab() {
    if (window.grecaptcha && typeof window.grecaptcha.ready === "function") {
      window.grecaptcha.ready(function() {
        var interval = setInterval(renderCallback, 1000);
        function renderCallback() {
          var container = document.getElementById("google-callback");
          if (container) {
            renderedCaptcha = window.grecaptcha.render(container, {
              sitekey: "6LcL2LEUAAAAANP2M8PsNoMotoiFBlFApE5pIX0y"
            });
            clearInterval(interval);
          }
        }
        renderCallback();
      });
    } else {
      setTimeout(grecaptchaGrab, 1000);
    }
  }
  setTimeout(grecaptchaGrab, 1000);

  /**
   * Creates an XHR request. This function due to the use of the
   * global variable XHR can be a source of bugs
   * @fixme
   * @returns {XMLHttpRequest} xhr request
   */
  function newXHR() {
    try {
      return (XHR = new XMLHttpRequest());
    } catch (e) {
      try {
        return (XHR = new ActiveXObject("Microsoft.XMLHTTP"));
      } catch (e) {
        return (XHR = new ActiveXObject("Msxml2.XMLHTTP"));
      }
    }
  }
  /**
   * Same function as before but without the use of a global variable
   * @note this was only used for new requests
   * @returns {XMLHttpRequest} request
   */
  function newXHRFixed() {
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
  function xget(xhr, path) {
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
  function xpost(xhr, path, data) {
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
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.withCredentials = true;
    xhr.send(encodedString);
    return xhr;
  }

  /**
   * Creates an auxiliary function that's used for some XHR request objects as onload callback
   * @param {XMLHttpRequest} xhr request object
   * @returns {Function} onload handler
   */
  function onLoadFunction(xhr) {
    return function onLoadImpl() {
      xhr.isBusy = false;
      reloadComments();
    };
  }
  var XHR = newXHR(),
    pagination = 0;
  var postData = [];
  var sorting = "newest";
  var voteXHR = newXHR();
  var authXHR = newXHR();
  var bookmarkXHR = newXHR();
  /**
   * Sets a global sorting criteria
   * @param {("newest"|"oldest"|"best")} s the type of the sorting
   */
  function setSorting(s) {
    pagination = 0;
    sorting = s;
    postData = [];
    document.getElementById("nodebb-comments-list").innerHTML = "";
    reloadComments();
  }
  /**
   * Sets the current active sorting button in the comments plugin
   * @param {("newest"|"oldest"|"best")} sorting the type of the sorting
   */
  function setActiveSortingLi(sorting) {
    var sorted = nodebbDiv.querySelectorAll(
      "a.active[data-component^='sort/']"
    );
    for (var i = 0; i < sorted.length; i++) {
      sorted[i].classList.remove("active");
    }
    var element = nodebbDiv.querySelector(
      "a[data-component='sort/" + sorting + "']"
    );
    if (element) {
      element.parentNode.classList.add("active");
    }
  }
  /**
   * onload handler for the authXHR variable. It creates a toast
   * with a message of login success or failed within it
   */
  authXHR.onload = function() {
    if (authXHR.status === 200) {
      reloadComments();
      setTimeout(function() {
        removeLoader();
        createSnackbar("Login success", true);
      }, 1500);
    } else {
      removeLoader();
      createSnackbar("Login failed", false);
    }
  };
  var signUpXHR = newXHRFixed();
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
        reloadComments();
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
  signUpXHR.onerror = removeLoader;
  authXHR.onerror = removeLoader;
  XHR.onload = onLoadFunction(XHR);
  bookmarkXHR.onload = onLoadFunction(bookmarkXHR);
  voteXHR.onload = onLoadFunction(voteXHR);

  /**
   * Upvotes a comment
   * @param {DOMElement} topicItem DOMElement for the comment
   * @param {Number} pid post (comment) ID
   * @param {Boolean} upvoted Whether the comment has been already upvoted or not
   */
  function upvotePost(topicItem, pid, upvoted) {
    var isUpvote = !upvoted;
    if (voteXHR.isBusy) return;
    voteXHR.isBusy = true;
    voteXHR.topicItem = topicItem;
    xpost(voteXHR, nodeBBURL + "/comments/vote", {
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
  function login(username, password, token) {
    if (authXHR.isBusy) return;
    authXHR.isBusy = true;
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
  function signUp(
    username,
    email,
    password,
    passwordConfirm,
    token,
    checkedTerms
  ) {
    if (signUpXHR.isBusy) return;
    signUpXHR.isBusy = true;
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
      captcha: grecaptcha.getResponse(renderedCaptcha)
    });
    addLoader();
  }

  /**
   * Adds a loading div in the DOM
   */
  function addLoader() {
    if (document.querySelector("div.loading")) {
      return;
    }
    var div = document.createElement("div");
    div.classList.add("loading");
    document.querySelector("body").appendChild(div);
  }

  /**
   * Removes the loading div from the DOM
   */
  function removeLoader() {
    var div = document.querySelector("div.loading");
    removeNodes(div);
  }

  /**
   * Downvotes a comment
   * @param {DOMElement} topicItem DOMElement for the comment
   * @param {Number} pid post (comment) ID
   * @param {Boolean} downvoted Whether the comment has been already downvoted or not
   */
  function downvotePost(topicItem, pid, downvoted) {
    var isDownvote = !downvoted;
    if (voteXHR.isBusy) return;
    voteXHR.isBusy = true;
    voteXHR.topicItem = topicItem;
    xpost(voteXHR, nodeBBURL + "/comments/downvote", {
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
  function bookmarkPost(topicItem, pid, bookmarked) {
    if (voteXHR.isBusy) return;
    voteXHR.isBusy = true;
    voteXHR.topicItem = topicItem;
    voteXHR.isBookmark = !bookmarked;
    xpost(voteXHR, nodeBBURL + "/comments/bookmark", {
      toPid: pid,
      isBookmark: !bookmarked
    });
  }
  /**
   * Creates a snackbar inside the dom
   * @param {string} text text of the snackbar
   * @param {boolean} success whether the snackbar will show a success or error message, this affects the class used by the object
   */
  function createSnackbar(text, success) {
    var div = document.createElement("div");
    div.classList.add("snackbar");
    div.classList.add("show-snackbar");
    div.classList.add(success ? "success" : "error");
    div.innerText = text;
    document.querySelector("body").appendChild(div);
    setTimeout(function removeSnackbar() {
      removeNodes(div);
    }, 3000);
  }
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
  function closeModal() {
    var modalElement = document.querySelector("div.modal[data-closed='0']");
    if (modalElement) {
      modalElement.setAttribute("data-closed", "1");
      modalElement.style.display = "none";
    }
  }
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

  function normalizePost(post) {
    return post
      .replace(/href="\/(?=\w)/g, 'href="' + nodeBBURL + "/")
      .replace(/src="\/(?=\w)/g, 'src="' + nodeBBURL + "/");
  }

  function prepareModal(modalTemplate, token, onSubmit) {
    var div = document.createElement("div");
    div.innerHTML = modalTemplate;
    div.querySelector("span.modal-close").onclick = closeModal;
    var form = div.querySelector("form");
    form.onsubmit = onSubmit;
    form.setAttribute("action", nodeBBURL + "/login");
    form.querySelector("input[name='_csrf']").setAttribute("value", token);
    return div;
  }

  function onSubmitSignUp(e) {
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

  function onSubmitLogin(e) {
    e.preventDefault();
    var t = e.target;
    login(
      t.querySelector("input[name='email']").value,
      t.querySelector("input[name='password']").value,
      t.querySelector("input[name='_csrf']").value
    );
    setTimeout(closeModal, 500);
  }

  function addRegisterValidators(modal) {
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

  function onClickSocialAuth(event) {
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

  function addSocialAuthListeners(modal) {
    var links = modal.querySelectorAll("a[data-link]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      a.addEventListener("click", onClickSocialAuth);
    }
  }

  XHR.onload = function() {
    removeLoader();
    if (XHR.status >= 200 && XHR.status < 400) {
      var data = JSON.parse(XHR.responseText),
        html;
      setActiveSortingLi(sorting, data.sorting);
      commentsDiv = document.getElementById("nodebb-comments-list");
      commentsCounter = document.getElementById("nodebb-comments-count");
      commentsAuthor = document.getElementById("nodebb-comments-author");
      commentsCategory = document.getElementById("nodebb-comments-category");
      postTemplate = data.singleCommentTpl;
      wholeTemplate = data.template;
      data.relative_path = nodeBBURL;
      data.redirect_url = articlePath;
      data.article_id = articleID;
      data.pagination = pagination;
      data.postCount = parseInt(data.postCount, 10);
      setTimeout(function() {
        var body = document.querySelector("body");
        var loginModal = prepareModal(
          data.loginModalTemplate,
          data.token,
          onSubmitLogin
        );
        addSocialAuthListeners(loginModal);
        body.appendChild(loginModal);
        var registerModal = prepareModal(
          data.registerModalTemplate,
          data.token,
          onSubmitSignUp
        );
        addRegisterValidators(registerModal);
        addSocialAuthListeners(registerModal);
        body.appendChild(registerModal);
      }, 0);

      for (var post in data.posts) {
        if (data.posts.hasOwnProperty(post)) {
          if (data.posts[post]["blog-comments:url"]) {
            delete data.posts[post];
          }
        }
      }
      addTimeAgoRecursive(data.posts);
      data.posts = postData.concat(data.posts);
      postData.push.apply(postData, data.posts);

      if (commentsCounter) {
        commentsCounter.innerHTML = data.postCount ? data.postCount - 1 : 0;
      }

      if (commentsCategory) {
        commentsCategory.innerHTML =
          '<a href="' +
          nodeBBURL +
          "/category/" +
          data.category.slug +
          '">' +
          data.category.name +
          "</a>";
      }

      if (commentsAuthor) {
        commentsAuthor.innerHTML =
          '<span class="nodebb-author"><img src="' +
          data.mainPost.user.picture +
          '" /> <a href="' +
          nodeBBURL +
          "/user/" +
          data.mainPost.user.userslug +
          '">' +
          data.mainPost.user.username +
          "</a></span>";
      }

      html = parse(data, data.template);
      nodebbDiv.innerHTML = normalizePost(html);
      setActiveSortingLi(sorting);
      var nodebbCommentsList = nodebbDiv.querySelector("#nodebb-comments-list");
      var selectors = [
        '[data-component="post/reply"]',
        '[data-component="post/quote"]',
        '[data-component="post/bookmark"]',
        '[data-component="post/upvote"]',
        '[data-component="post/downvote"]',
        '[data-component="post/edit"]'
      ].join(",");
      bindOnClick(nodebbDiv.querySelectorAll(selectors), function(event) {
        if (!data.user || !data.user.uid) {
          authenticate("login");
          return;
        }

        var dataComponent = this.getAttribute("data-component");
        var topicItem = event.target;
        var bookmarked = JSON.parse(this.getAttribute("data-bookmarked"));
        var upvoted = JSON.parse(this.getAttribute("data-upvoted"));
        var downvoted = JSON.parse(this.getAttribute("data-downvoted"));

        while (topicItem && !topicItem.classList.contains("topic-item")) {
          topicItem = topicItem.parentElement;
        }

        if (topicItem) {
          var pid = topicItem.getAttribute("data-pid");
          var uid = topicItem.getAttribute("data-uid");
          var level = topicItem.getAttribute("data-level");
          var formClass = /\/edit$/.test(dataComponent)
            ? ".sub-edit-input"
            : ".sub-reply-input";
          var elementForm = topicItem.querySelector("form" + formClass);
          var formInput = elementForm.querySelector("textarea");
          var visibleForm = nodebbCommentsList.querySelector(
            "li .topic-item form:not(.hidden)" + ":not(" + formClass + ")"
          );
          if (visibleForm && visibleForm !== elementForm) {
            visibleForm.classList.add("hidden");
          }
          var postBody;
          if (/\/(quote|edit)$/.test(dataComponent)) {
            postBody = topicItem.querySelector(".post-content .post-body");
          }

          if (/\/quote$/.test(dataComponent)) {
            var quote = (postBody.innerText
              ? postBody.innerText
              : postBody.textContent
            )
              .split("\n")
              .map(function(line) {
                return line ? "> " + line : line;
              })
              .join("\n");
            formInput.value =
              "@" +
              topicItem.getAttribute("data-userslug") +
              " said:\n" +
              quote +
              formInput.value;
            elementForm.classList.remove("hidden");
          } else if (/\/reply$/.test(dataComponent)) {
            if (level >= 2) {
              var atStr = "@" + topicItem.getAttribute("data-userslug") + ":";
              var regex = new RegExp("^" + atStr, "i");
              if (regex.test(formInput.value)) {
                if (formInput.value.trim() !== atStr) {
                  formInput.value = formInput.value.replace(regex, "").trim();
                }
              } else {
                formInput.value = atStr + " " + formInput.value;
              }
            } else {
              formInput.value = "";
            }
            elementForm.classList.remove("hidden");
          } else if (/\/edit$/.test(dataComponent)) {
            formInput.value = postBody.textContent;
            elementForm.classList.remove("hidden");
          } else if (/\/upvote$/.test(dataComponent)) {
            if (data.user.uid != uid) {
              upvotePost(topicItem, pid, upvoted);
            }
          } else if (/\/downvote$/.test(dataComponent)) {
            if (data.user.uid != uid) {
              downvotePost(topicItem, pid, downvoted);
            }
          } else if (/\/bookmark$/.test(dataComponent)) {
            bookmarkPost(topicItem, pid, bookmarked);
          }
        } else {
          if (/\/upvote$/.test(dataComponent)) {
            if (data.user.uid != mainPost.uid) {
              upvotePost(
                nodebbDiv.querySelector(".top-tool-box"),
                mainPost.pid,
                upvoted
              );
            }
          } else if (/\/bookmark$/.test(dataComponent)) {
            bookmarkPost(
              nodebbDiv.querySelector(".top-tool-box"),
              mainPost.pid,
              bookmarked
            );
          } else if (/\/downvote$/.test(dataComponent)) {
            downvotePost(
              nodebbDiv.querySelector(".top-tool-box"),
              mainPost.pid,
              downvoted
            );
          }
        }
      });
      nodebbDiv
        .querySelector("a[data-component='sort/best']")
        .addEventListener("click", () => setSorting("best"));
      nodebbDiv
        .querySelector("a[data-component='sort/newest']")
        .addEventListener("click", () => setSorting("newest"));
      nodebbDiv
        .querySelector("a[data-component='sort/oldest']")
        .addEventListener("click", () => setSorting("oldest"));
      contentDiv = document.getElementById("nodebb-content");
      if (savedText) {
        contentDiv.value = savedText;
      }

      if (data.tid) {
        var loadMore = document.getElementById("nodebb-load-more");
        if (data.posts.length) {
          loadMore.style.display = "inline-block";
        }

        if (pagination * 10 + data.posts.length + 1 >= data.postCount) {
          loadMore.style.display = "none";
        }

        if (typeof jQuery !== "undefined" && jQuery() && jQuery().fitVids) {
          jQuery(nodebbDiv).fitVids();
        }

        if (data.user && data.user.uid) {
          var error = window.location.href.match(/error=[\w-]*/);
          if (error) {
            error = error[0].split("=")[1];
            if (error === "too-many-posts") {
              error = "Please wait before posting so soon.";
            } else if (error === "content-too-short") {
              error = "Please post a longer reply.";
            }

            document.getElementById("nodebb-error").innerHTML = error;
          }
        } else {
          document.getElementById("nodebb-register").onclick = function() {
            authenticate("register");
          };

          document.getElementById("nodebb-login").onclick = function() {
            authenticate("login");
          };
        }
      } else {
        if (data.isAdmin) {
          var adminXHR = newXHR();
          //adminXHR.open('GET', wordpressURL + '?json=get_post&post_type='+articleType+'&post_id=' + articleID);
          // TODO Get articles too, not only post types
          adminXHR.open(
            "GET",
            wordpressURL + "/wp-json/wp/v2/posts/" + articleID
          );
          adminXHR.onload = function() {
            if (adminXHR.status >= 200 && adminXHR.status < 400) {
              // We need tags
              var articleData = JSON.parse(adminXHR.responseText.toString()),
                translator = document.createElement("span"),
                tags = articleData.tags;

              translator.innerHTML = articleData.excerpt
                ? articleData.excerpt.rendered
                : "";

              var markdown =
                translator.firstChild.innerHTML +
                "\n\n**Click [here](" +
                articlePath +
                ") to see the full blog post**";

              document.getElementById(
                "nodebb-content-markdown"
              ).value = markdown;
              document.getElementById("nodebb-content-title").value =
                articleData.title.rendered;
              document.getElementById("nodebb-content-cid").value =
                categoryID || -1;
              document.getElementById(
                "nodebb-content-tags"
              ).value = JSON.stringify(tags);
              document.getElementById("nodebb-content-blogger").value =
                window.blogger || "default";
            } else {
              console.warn(
                "Unable to access API. Please install the JSON API plugin located at: http://wordpress.org/plugins/json-api"
              );
            }
          };

          adminXHR.send();
        }
      }
    }
  };

  function reloadComments() {
    XHR.open(
      "GET",
      nodeBBURL +
        "/comments/get/" +
        (window.blogger || "default") +
        "/" +
        articleID +
        "/" +
        pagination +
        "/" +
        sorting,
      true
    );
    XHR.withCredentials = true;
    XHR.send();
    addLoader();
  }

  reloadComments();
  function addTimeAgoRecursive(posts) {
    var len = posts.length;
    for (var i = 0; i < len; i++) {
      var post = posts[i];
      post.timestamp = timeAgo(parseInt(post.timestamp, 10));
      if (post.children && post.children.length) {
        var childrenLen = post.children.length;
        for (var j = 0; j < childrenLen; j++) {
          addTimeAgoRecursive(post.children[j]);
        }
      }
    }
  }
  // DISPLAY TIME AGO
  function timeAgo(time) {
    var time_formats = [
      [60, "secondes", 1],
      [120, "il y a une minute"],
      [3600, "minutes", 60],
      [7200, "il y a une heure"],
      [86400, "heures", 3600],
      [172800, "hier"],
      [604800, "jours", 86400],
      [1209600, "la semaine dernière"],
      [2419200, "semaines", 604800],
      [4838400, "le mois dernier"],
      [29030400, "mois", 2419200],
      [58060800, "il y a un an"],
      [2903040000, "ans", 29030400]
    ];

    var seconds = (+new Date() - time) / 1000;

    if (seconds < 10) {
      return "à l'instant";
    }

    var i = 0,
      format;
    while ((format = time_formats[i++])) {
      if (seconds < format[0]) {
        if (!format[2]) {
          return format[1];
        } else {
          return "il y a " + Math.floor(seconds / format[2]) + " " + format[1];
        }
      }
    }
    return time;
  }

  var templates = { blocks: {} };
  function parse(data, template) {
    function replace(key, value, template) {
      var searchRegex = new RegExp("{" + key + "}", "g");
      return template.replace(searchRegex, value);
    }

    function makeRegex(block) {
      return new RegExp(
        "<!--[\\s]*BEGIN " +
          block +
          "[\\s]*-->[\\s\\S]*<!--[\\s]*END " +
          block +
          "[\\s]*-->",
        "g"
      );
    }

    function makeConditionalRegex(block) {
      return new RegExp(
        "<!--[\\s]*IF " +
          block +
          "[\\s]*-->([\\s\\S]*?)<!--[\\s]*ENDIF " +
          block +
          "[\\s]*-->",
        "g"
      );
    }

    function getBlock(regex, block, template) {
      data = template.match(regex);
      if (data == null) return;

      if (block !== undefined) templates.blocks[block] = data[0];

      var begin = new RegExp("(\r\n)*<!-- BEGIN " + block + " -->(\r\n)*", "g"),
        end = new RegExp("(\r\n)*<!-- END " + block + " -->(\r\n)*", "g"),
        data = data[0].replace(begin, "").replace(end, "");

      return data;
    }

    function setBlock(regex, block, template) {
      return template.replace(regex, block);
    }

    var regex, block;

    return (function parse(data, namespace, template, blockInfo) {
      if (!template) {
        return "";
      }
      if (!data || data.length == 0) {
        template = "";
      }
      function checkConditional(key, value) {
        var conditional = makeConditionalRegex(key),
          matches = template.match(conditional);

        if (matches !== null) {
          for (var i = 0, ii = matches.length; i < ii; i++) {
            var conditionalBlock = matches[i].split(/<!-- ELSE -->/);

            var statement = new RegExp(
              "(<!--[\\s]*IF " +
                key +
                "[\\s]*-->)|(<!--[\\s]*ENDIF " +
                key +
                "[\\s]*-->)",
              "gi"
            );

            if (conditionalBlock[1]) {
              // there is an else statement
              if (!value) {
                template = template.replace(
                  matches[i],
                  conditionalBlock[1].replace(statement, "")
                );
              } else {
                template = template.replace(
                  matches[i],
                  conditionalBlock[0].replace(statement, "")
                );
              }
            } else {
              // regular if statement
              if (!value) {
                template = template.replace(matches[i], "");
              } else {
                template = template.replace(
                  matches[i],
                  matches[i].replace(statement, "")
                );
              }
            }
          }
        }
      }

      for (var d in data) {
        if (data.hasOwnProperty(d)) {
          if (typeof data[d] === "undefined") {
            continue;
          } else if (data[d] === null) {
            template = replace(namespace + d, "", template);
          } else if (data[d].constructor == Array) {
            checkConditional(namespace + d + ".length", data[d].length);
            checkConditional("!" + namespace + d + ".length", !data[d].length);

            namespace += d + ".";

            var regex = makeRegex(d),
              block = getBlock(
                regex,
                namespace.substring(0, namespace.length - 1),
                template
              );

            if (block == null) {
              namespace = namespace.replace(d + ".", "");
              continue;
            }

            var numblocks = data[d].length - 1,
              i = 0,
              result = "";

            do {
              result += parse(data[d][i], namespace, block, {
                iterator: i,
                total: numblocks
              });
            } while (i++ < numblocks);

            namespace = namespace.replace(d + ".", "");
            template = setBlock(regex, result, template);
          } else if (data[d] instanceof Object) {
            template = parse(data[d], d + ".", template);
          } else {
            var key = namespace + d,
              value =
                typeof data[d] === "string"
                  ? data[d].replace(/^\s+|\s+$/g, "")
                  : data[d];

            checkConditional(key, value);
            checkConditional("!" + key, !value);

            if (blockInfo && blockInfo.iterator) {
              checkConditional("@first", blockInfo.iterator === 0);
              checkConditional("!@first", blockInfo.iterator !== 0);
              checkConditional("@last", blockInfo.iterator === blockInfo.total);
              checkConditional(
                "!@last",
                blockInfo.iterator !== blockInfo.total
              );
            }

            template = replace(key, value, template);
          }
        }
      }
      if (namespace) {
        var regex = new RegExp("{" + namespace + "[\\s\\S]*?}", "g");
        template = template.replace(regex, "");
        namespace = "";
      } else {
        // clean up all undefined conditionals
        template = template
          .replace(/<!-- ELSE -->/gi, "ENDIF -->")
          .replace(/<!-- IF([^@]*?)ENDIF([^@]*?)-->/gi, "");
      }
      var divPost = document.createElement("div");
      divPost.innerHTML = postTemplate;
      var div = document.createElement("div");
      div.innerHTML = template;
      if (data.hasOwnProperty("posts")) {
        // TODO try to use parse function again
        var nested = createNestedComments(
          data.posts,
          divPost.querySelector("li"),
          data
        );
        div.querySelector("#nodebb-comments-list").innerHTML = nested.innerHTML;
        template = div.innerHTML;
      }
      return template;
    })(data, "", template);
  }
  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
  function addButtons() {
    var div = document.createElement("div");
    div.classList.add("load-more-div");
    var button = document.createElement("button");
    button.id = "nodebb-load-more";
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.innerText = "Charger plus de commentaires...";
    button.addEventListener("click", function loadMoreClick() {
      pagination++;
      reloadComments();
    });
    div.appendChild(button);
    insertAfter(div, document.querySelector("#nodebb"));
  }
  addButtons();
})();
