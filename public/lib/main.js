import { XHRlisteners } from "http://localhost/projects/nodebb-plugin/public/lib/requests.js"; 
import { removeLoader,removeNodes,timeAgo } from "http://localhost/projects/nodebb-plugin/public/lib/util.js"; 
  


  function loadScript(url, callback){
    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState && callback){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else if (callback) {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    // document.getElementsByTagName("body")[0].appendChild(script);
    document.querySelector("#nodebb-comments").parentNode.insertBefore(script,document.querySelector("#nodebb-comments"));
  }

  function loadCSS(url) {
  	var stylesheet = document.createElement("link");
  	stylesheet.setAttribute("rel", "stylesheet");
  	stylesheet.setAttribute("type", "text/css");
  	stylesheet.setAttribute("href", url);
  	document.getElementsByTagName("head")[0].appendChild(stylesheet);
  }

	function pluginInitialization(){
		articlePath = window.location.protocol + "//" + window.location.host + window.location.pathname;

		// pluginURL = nodeBBURL + "/plugins/nodebb-plugin-blog-comments-cryptofr";
    pluginURL = "http://localhost/projects/nodebb-plugin/public";

		// commentsURL = nodeBBURL + "/comments/get/" +(window.blogger || "default") + "/" + articleID +   "/" +  pagination + "/" + sorting;
		commentsURL = 'http://localhost/projects/test.json';

		loadCSS(pluginURL + "/css/comments.css")
		loadCSS(pluginURL + "/css/cryptofr.css")

		document.getElementById("nodebb-comments").insertAdjacentHTML("beforebegin",'<div class="comments-area" id="nodebb"></div>');
		nodebbDiv = document.getElementById("nodebb");

		setTimeout(grecaptchaGrab, 1000);

		XHR = newXHR();
		pagination = 0;
		postData = [];
		sorting = "newest";
		voteXHR = newXHR();
		authXHR = newXHR();
		bookmarkXHR = newXHR();
		signUpXHR = newXHRFixed();


		signUpXHR.onerror = removeLoader;
		authXHR.onerror = removeLoader;
		XHR.onload = onLoadFunction(XHR);
		bookmarkXHR.onload = onLoadFunction(bookmarkXHR);
		voteXHR.onload = onLoadFunction(voteXHR);

		reloadComments();

		templates = { blocks: {} };

		addButtons();

		XHRlisteners();

	}

  /**
   * This variable will grab a captcha that will then be rendered in the page
   * @type {DOMElement}
   */

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
  /**
   * Sets a global sorting criteria
   * @param {("newest"|"oldest"|"best")} s the type of the sorting
   */
  export function setSorting(s) {
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
  export function setActiveSortingLi(sorting) {
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
  function signUp(username,email,password,passwordConfirm,token,checkedTerms) {
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
   * Function that reloads all comments within the DOM
   */
  function reloadComments() {
    XHR.open(
      "GET",
      commentsURL,
      true
    );
    XHR.withCredentials = true;
    XHR.send();
    addLoader();
  }

  

  
  

  /**
   * Parses template
   * @param {Object} data the data to be put on the template
   * @returns {String} parsed template
   */
  export function parse(data, template) {
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



	pluginInitialization();


