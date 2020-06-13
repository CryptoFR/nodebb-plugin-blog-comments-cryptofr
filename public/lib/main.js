// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"LXja":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = exports.reload = exports.templates = exports.renderedCaptcha = exports.wholeTemplate = exports.postTemplate = exports.articlePath = exports.commentsCategory = exports.commentsAuthor = exports.commentsCounter = exports.commentsDiv = exports.contentDiv = exports.nodebbDiv = exports.savedText = exports.commentsURL = exports.XHR = exports.pagination = exports.postData = exports.sorting = exports.signUpXHR = exports.bookmarkXHR = exports.authXHR = exports.voteXHR = exports.pluginURL = exports.page = exports.reloading = exports.commentXHR = exports.dataRes = exports.gifCommentBox = exports.commentData = exports.activeUserComments = exports.firstTime = exports.timestamp = void 0;
var timestamp, firstTime, activeUserComments, commentData, gifCommentBox, dataRes, commentXHR, reloading, page, pluginURL, voteXHR, authXHR, bookmarkXHR, signUpXHR, sorting, postData, pagination, XHR, commentsURL, savedText, nodebbDiv, contentDiv, commentsDiv, commentsCounter, commentsAuthor, commentsCategory, articlePath, postTemplate, wholeTemplate, renderedCaptcha, templates, reload;
exports.reload = reload;
exports.templates = templates;
exports.renderedCaptcha = renderedCaptcha;
exports.wholeTemplate = wholeTemplate;
exports.postTemplate = postTemplate;
exports.articlePath = articlePath;
exports.commentsCategory = commentsCategory;
exports.commentsAuthor = commentsAuthor;
exports.commentsCounter = commentsCounter;
exports.commentsDiv = commentsDiv;
exports.contentDiv = contentDiv;
exports.nodebbDiv = nodebbDiv;
exports.savedText = savedText;
exports.commentsURL = commentsURL;
exports.XHR = XHR;
exports.pagination = pagination;
exports.postData = postData;
exports.sorting = sorting;
exports.signUpXHR = signUpXHR;
exports.bookmarkXHR = bookmarkXHR;
exports.authXHR = authXHR;
exports.voteXHR = voteXHR;
exports.pluginURL = pluginURL;
exports.page = page;
exports.reloading = reloading;
exports.commentXHR = commentXHR;
exports.dataRes = dataRes;
exports.gifCommentBox = gifCommentBox;
exports.commentData = commentData;
exports.activeUserComments = activeUserComments;
exports.firstTime = firstTime;
exports.timestamp = timestamp;
exports.commentData = commentData = [];
exports.activeUserComments = activeUserComments = [];
var set = {
  commentData: commentDataVal,
  pluginURL: pluginURLVal,
  voteXHR: voteXHRVal,
  authXHR: authXHRVal,
  commentXHR: commentXHRVal,
  signUpXHR: signUpXHRVal,
  bookmarkXHR: bookmarkXHRVal,
  sorting: sortingVal,
  postData: postDataVal,
  pagination: paginationVal,
  XHR: XHRVal,
  commentsURL: commentsURLVal,
  savedText: savedTextVal,
  nodebbDiv: nodebbDivVal,
  contentDiv: contentDivVal,
  commentsDiv: commentsDivVal,
  commentsCounter: commentsCounterVal,
  commentsAuthor: commentsAuthorVal,
  commentsCategory: commentsCategoryVal,
  articlePath: articlePathVal,
  postTemplate: postTemplateVal,
  wholeTemplate: wholeTemplateVal,
  renderedCaptcha: renderedCaptchaVal,
  templates: templatesVal,
  dataRes: dataResVal,
  page: pageVal,
  reloading: reloadingVal,
  gifCommentBox: gifCommentBoxVal,
  reload: reloadVal,
  firstTime: firstTimeVal,
  timestamp: timestampVal,
  activeUserComments: activeUserCommentsVal,
  activeUserCommentsReset: activeUserCommentsValReset
};
exports.set = set;

function pluginURLVal(value) {
  exports.pluginURL = pluginURL = value;
}

function voteXHRVal(value) {
  exports.voteXHR = voteXHR = value;
}

function authXHRVal(value) {
  exports.authXHR = authXHR = value;
}

function commentXHRVal(value) {
  exports.commentXHR = commentXHR = value;
}

function signUpXHRVal(value) {
  exports.signUpXHR = signUpXHR = value;
}

function bookmarkXHRVal(value) {
  exports.bookmarkXHR = bookmarkXHR = value;
}

function sortingVal(value) {
  exports.sorting = sorting = value;
}

function postDataVal(value) {
  exports.postData = postData = value;
}

function paginationVal(value) {
  exports.pagination = pagination = value;
}

function XHRVal(value) {
  exports.XHR = XHR = value;
}

function commentsURLVal(value) {
  exports.commentsURL = commentsURL = value;
}

function savedTextVal(value) {
  exports.savedText = savedText = value;
}

function nodebbDivVal(value) {
  exports.nodebbDiv = nodebbDiv = value;
}

function contentDivVal(value) {
  exports.contentDiv = contentDiv = value;
}

function commentsDivVal(value) {
  exports.commentsDiv = commentsDiv = value;
}

function commentsCounterVal(value) {
  exports.commentsCounter = commentsCounter = value;
}

function commentsAuthorVal(value) {
  exports.commentsAuthor = commentsAuthor = value;
}

function commentsCategoryVal(value) {
  exports.commentsCategory = commentsCategory = value;
}

function articlePathVal(value) {
  exports.articlePath = articlePath = value;
}

function postTemplateVal(value) {
  exports.postTemplate = postTemplate = value;
}

function wholeTemplateVal(value) {
  exports.wholeTemplate = wholeTemplate = value;
}

function renderedCaptchaVal(value) {
  exports.renderedCaptcha = renderedCaptcha = value;
}

function templatesVal(value) {
  exports.templates = templates = value;
}

function dataResVal(value) {
  exports.dataRes = dataRes = value;
}

function pageVal(value) {
  exports.page = page = value;
}

function reloadingVal(value) {
  exports.reloading = reloading = value;
}

function gifCommentBoxVal(value) {
  exports.gifCommentBox = gifCommentBox = value;
}

function reloadVal(value) {
  exports.reload = reload = value;
}

function firstTimeVal(value) {
  exports.firstTime = firstTime = value;
}

function commentDataVal(value) {
  exports.commentData = commentData = value;
}

function timestampVal(value) {
  exports.timestamp = timestamp = value;
}

function activeUserCommentsVal(value) {
  activeUserComments.push(value);
}

function activeUserCommentsValReset(value) {
  exports.activeUserComments = activeUserComments = value;
}
},{}],"VGLh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTimeAgoRecursive = addTimeAgoRecursive;
exports.timeAgo = timeAgo;
exports.getCurrentDate = getCurrentDate;
exports.removeNodes = removeNodes;
exports.addLoader = addLoader;
exports.removeLoader = removeLoader;
exports.normalizePost = normalizePost;
exports.loadCSS = loadCSS;
exports.loadScript = loadScript;
exports.loadScriptHead = loadScriptHead;
exports.insertAfter = insertAfter;
exports.changeAttribute = changeAttribute;
exports.addClassHelper = addClassHelper;
exports.dispatchEmojis = dispatchEmojis;
exports.reactElementRelocation = reactElementRelocation;
exports.getIndexesOf = getIndexesOf;
exports.parseLineBreaks = parseLineBreaks;
exports.parseCommentQuotes = parseCommentQuotes;
exports.getCoords = getCoords;
exports.dragElement = dragElement;
exports.debounce = debounce;
exports.isHidden = isHidden;
exports.bindOnClick = void 0;

var _settings = require("../settings.js");

/**
 * Utility function that recursively parses the timestamp of each of the posts
 * in order to show a human representation of that timestamp
 * @param {Array} posts
 */
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
/**
 * @param {Number} time time in seconds
 * @returns {String} a human representation of the time spent in French
 */


function timeAgo(time) {
  var time_formats = [[60, "secondes", 1], [120, "il y a une minute"], [3600, "minutes", 60], [7200, "il y a une heure"], [86400, "heures", 3600], [172800, "hier"], [604800, "jours", 86400], [1209600, "la semaine dernière"], [2419200, "semaines", 604800], [4838400, "le mois dernier"], [29030400, "mois", 2419200], [58060800, "il y a un an"], [2903040000, "ans", 29030400]];
  var seconds = (+new Date() - time) / 1000;

  if (seconds < 10) {
    return "à l'instant";
  }

  var i = 0,
      format;

  while (format = time_formats[i++]) {
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

function getCurrentDate() {
  var date_ob = new Date(); // adjust 0 before single digit date

  var date = ("0" + date_ob.getDate()).slice(-2); // current month

  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2); // current year

  var year = date_ob.getFullYear(); // prints date & time in YYYY-MM-DD format

  return year + "-" + month + "-" + date;
}

function removeNodes(nodes) {
  var nodeList = nodes && nodes.length !== undefined ? nodes : [nodes];
  var len = nodeList.length;
  if (nodes) for (var i = 0; i < len; i++) {
    var node = nodeList[i];
    node.parentNode.removeChild(node);
  }
}
/**
 * Adds a loading div for the plugin loading
 */


function addLoader() {
  if (document.querySelector("div.loading")) {
    return;
  }

  var div = document.createElement("div");
  div.classList.add("loading");
  div.innerHTML = "<img src='" + nodeBBURL + "/plugins/nodebb-plugin-blog-comments-cryptofr/img/loader.gif'>";
  if (document.querySelector(".load-more-div")) document.querySelector(".load-more-div").appendChild(div);else document.querySelector("#nodebb").appendChild(div);
  document.querySelector("body").classList.add("hasLoader");
}
/**
 * Removes the loading div from the DOM
 */


function removeLoader() {
  var div = document.querySelector("#nodebb-comments-list div.loading");
  if (div) removeNodes(div);
  document.querySelector("body").classList.remove("hasLoader");
}
/**
 * Adds the URL of the NodeBB forum to the post's html
 * @param {string} post post html
 * @returns {string} normalized post
 */


function normalizePost(post) {
  return post.replace(/href="\/(?=\w)/g, 'href="' + nodeBBURL + "/").replace(/src="\/(?=\w)/g, 'src="' + nodeBBURL + "/");
}

function loadCSS(url) {
  var stylesheet = document.createElement("link");
  stylesheet.setAttribute("rel", "stylesheet");
  stylesheet.setAttribute("type", "text/css");
  stylesheet.setAttribute("href", url);
  document.getElementsByTagName("head")[0].appendChild(stylesheet);
}

function loadScript(url) {
  var script = document.createElement('script'); // script.async = true;
  // script.defer = true;

  script.src = url;
  document.getElementsByTagName('body')[0].appendChild(script);
}

function loadScriptHead(url) {
  var script = document.createElement('script'); // script.async = true;
  // script.defer = true;

  script.src = url;
  document.getElementsByTagName('head')[0].insertBefore(script, document.getElementsByTagName('head')[0].firstChild);
}
/**
 * Bind on Click event for nodeList
 * @param {Array<DOMElement>} nodeList nodes for with the click event will be added
 * @param {Function} handler a handler
 */


var bindOnClick = function bindOnClick(nodeList, handler) {
  for (var i = nodeList.length - 1; i >= 0; i--) {
    nodeList[i].onclick = handler;
  }
};

exports.bindOnClick = bindOnClick;

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
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

function dispatchEmojis() {
  var evt = new CustomEvent('dispatchEmojis', {});
  window.dispatchEvent(evt);
  var emojiBox = document.querySelector('.comments-enhancement-box #emoji-button');
  $(emojiBox).append($('.emoji-menu'));
}

window.dispatchEmojis = dispatchEmojis;

function reactElementRelocation() {
  $("#buttons-container").prepend($("#root button"));
}

function getIndexesOf(searchStr, str, caseSensitive) {
  var searchStrLen = searchStr.length;

  if (searchStrLen == 0) {
    return [];
  }

  var startIndex = 0,
      index,
      indices = [];

  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }

  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }

  return indices;
} // PARSE Line breaks


function parseLineBreaks(comment) {
  var comment = comment.split("\n").join("<br>");
  return comment;
} // PARSE QUOTES (FAIL)


function parseCommentQuotes(comment) {
  var quotesChar = comment.split(/^\>|&gt;/gm); // Matches to first > character in each line

  var quoting = false;

  if (quotesChar.length > 1) {
    var newcomment = "";

    for (var i = 0; i < quotesChar.length; i++) {
      if (quotesChar[i].length > 1) {
        if (quoting == false) {
          quoting = true;
          quotesChar[i] = "<span class='quote-marks'>" + quotesChar[i];
        }

        if (quotesChar[i].split("\n").length > 1) {
          var quotesParsed = quotesChar[i].split("\n");
          var newQuote = quotesParsed[0] + "</span>";

          for (var j = 1; j < quotesParsed.length; j++) {
            newQuote = newQuote + "<br>" + quotesParsed[j];
          }

          quoting = false;
          quotesChar[i] = newQuote;
        }

        newcomment = newcomment + quotesChar[i];
      }
    }

    comment = newcomment;
  }

  return comment;
}

function getCoords(elem) {
  // crossbrowser version
  var box = elem.getBoundingClientRect();
  var body = document.body;
  var docEl = document.documentElement;
  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;
  return {
    top: Math.round(top),
    left: Math.round(left)
  };
} // Drag a window


function dragElement(elmnt) {
  console.log('dragElement');
  var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

  if (elmnt.querySelector(".header")) {
    // if present, the header is where you move the DIV from:
    elmnt.querySelector(".header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault(); // get the mouse cursor position at startup:

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement; // call a function whenever the cursor moves:

    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault(); // calculate the new cursor position:

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY; // set the element's new position:

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
} // Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.


function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

;

function isHidden(el) {
  var style = window.getComputedStyle(el);
  return style.display === 'none';
}
},{"../settings.js":"LXja"}],"gYYA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newXHR = newXHR;
exports.newXHRFixed = newXHRFixed;
exports.xget = xget;
exports.xpost = xpost;
exports.newFetch = newFetch;
exports.newFetchGet = newFetchGet;
exports.getNewerComments = getNewerComments;
exports.upvotePost = upvotePost;
exports.login = login;
exports.signUp = signUp;
exports.downvotePost = downvotePost;
exports.bookmarkPost = bookmarkPost;
exports.deletePost = deletePost;
exports.logout = logout;

var _settings = require("../settings.js");

var _util = require("./util.js");

var _modal = require("./login/modal.js");

var _loadComments = require("./comments/loadComments.js");

/**
 * Creates an XHR request. This function due to the use of the
 * global variable XHR can be a source of bugs
 * @fixme
 * @returns {XMLHttpRequest} xhr request
 */
function newXHR() {
  try {
    _settings.set.XHR(new XMLHttpRequest());

    return _settings.XHR;
  } catch (e) {
    try {
      _settings.set.XHR(new ActiveXObject("Microsoft.XMLHTTP"));

      return _settings.XHR;
    } catch (e) {
      _settings.set.XHR(new ActiveXObject("Msxml2.XMLHTTP"));

      return _settings.XHR;
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

      encodedString += encodeURIComponent(prop) + "=" + encodeURIComponent(data[prop]);
    }
  }

  xhr.open("POST", path, true);
  xhr.withCredentials = true;
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(encodedString);
  return xhr;
}

function newFetch(path) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var encodedString = "";

  for (var prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (encodedString.length > 0) {
        encodedString += "&";
      }

      encodedString += encodeURIComponent(prop) + "=" + encodeURIComponent(data[prop]);
    }
  }

  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    credentials: 'include',
    body: encodedString
  });
}

function newFetchGet(path) {
  return fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    credentials: 'include'
  });
}

function getNewerComments(timestamp, tid) {
  return newFetchGet(nodeBBURL + "/comments/new/" + tid + "/" + timestamp);
}
/**
 * Upvotes a comment
 * @param {DOMElement} topicItem DOMElement for the comment
 * @param {Number} pid post (comment) ID
 * @param {Boolean} upvoted Whether the comment has been already upvoted or not
 */


function upvotePost(topicItem, pid, upvoted) {
  var isUpvote = !upvoted;
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


function login(username, password, token) {
  return newFetch(nodeBBURL + "/login", {
    username: username,
    password: password,
    _csrf: token,
    remember: "on",
    noscript: false
  }).then(function (res) {
    var loginSuccess = res.status === 200;

    if (!loginSuccess) {
      (0, _modal.loginError)("L'identifiant et/ou le mot de passe sont erronés");
      var loginButton = document.querySelectorAll('button.login-button')[0];
      loginButton.classList.remove("loading-button");
    } else (0, _loadComments.reloadComments)(0, 0, false);
  });
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


function signUp(username, email, password, passwordConfirm, token, checkedTerms) {
  if (_settings.signUpXHR.isBusy) return;
  var signUpXHRaux = _settings.signUpXHR;
  signUpXHRaux.isBusy = true;

  _settings.set.signUpXHR(signUpXHRaux);

  xpost(_settings.signUpXHR, nodeBBURL + "/comments/plugin/register", {
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
    captcha: window.grecaptcha.getResponse(_settings.renderedCaptcha)
  });
  (0, _util.addLoader)();
}
/**
 * Downvotes a comment
 * @param {DOMElement} topicItem DOMElement for the comment
 * @param {Number} pid post (comment) ID
 * @param {Boolean} downvoted Whether the comment has been already downvoted or not
 */


function downvotePost(topicItem, pid, downvoted) {
  var isDownvote = !downvoted;
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


function bookmarkPost(topicItem, pid, bookmarked) {
  if (_settings.voteXHR.isBusy) return;
  var voteXHRaux = _settings.voteXHR;
  voteXHRaux.isBusy = true;
  voteXHRaux.topicItem = topicItem;
  voteXHRaux.isBookmark = !bookmarked;

  _settings.set.voteXHR(voteXHRaux);

  return newFetch(nodeBBURL + "/comments/bookmark", {
    toPid: pid,
    isBookmark: !bookmarked
  });
}
/**
 * Deletes a comment
 * @param {DOMElement} topicItem DOMElement for the comment
 * @param {Number} pid post (comment) ID
 */


function deletePost(topicItem, pid) {
  var voteXHRaux = _settings.voteXHR;
  voteXHRaux.isBusy = true;
  voteXHRaux.topicItem = topicItem;

  _settings.set.voteXHR(voteXHRaux);

  return newFetch(nodeBBURL + "/comments/delete/" + pid, {});
}

function logout(token) {
  (0, _util.addLoader)();
  return newFetch(nodeBBURL + "/logout", {
    _csrf: token,
    noscript: false
  }).then(_util.removeLoader).then(function () {
    return (0, _loadComments.reloadComments)(0, 0, false);
  });
}
},{"../settings.js":"LXja","./util.js":"VGLh","./login/modal.js":"kjEe","./comments/loadComments.js":"V8ra"}],"poQx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIfWpAdmin = checkIfWpAdmin;

function checkIfWpAdmin() {
  if (window.location.href.indexOf("cryptofr_comments_plugin") > -1) {
    return true;
  }

  return false;
}
},{}],"XBBC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gifBoxInit = gifBoxInit;
exports.gifContentCheck = gifContentCheck;
exports.singleGifComment = singleGifComment;
exports.closeGifBox = closeGifBox;

var _settings = require("../../settings.js");

var _util = require("../util.js");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// url Async requesting function
function httpGetAsync(theUrl, callback) {
  // create the request object
  var xmlHttp = new XMLHttpRequest(); // set the state change callback to capture when the response comes in

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      callback(xmlHttp.responseText);
    }
  }; // open as a GET call, pass in the url and set async = True


  xmlHttp.open("GET", theUrl, true); // call send with no params as they were passed in on the url string

  xmlHttp.send(null);
  return;
} // callback for the top 8 GIFs of search


function tenorCallback_search(responsetext) {
  // parse the json response
  var response_objects = JSON.parse(responsetext); // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (tinygif)

  var _iterator = _createForOfIteratorHelper(document.querySelectorAll("#gifs-list img")),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var img = _step.value;
      img.parentNode.removeChild(img);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  document.querySelector("#gifs-list").innerHTML = "";

  var _iterator2 = _createForOfIteratorHelper(response_objects["results"]),
      _step2;

  try {
    var _loop = function _loop() {
      var img = _step2.value;
      element = document.createElement("img");
      element.src = img["media"][0]["nanogif"]["url"];
      element.classList.add("gifs-result");
      element.addEventListener("click", function (event) {
        _settings.gifCommentBox.value = _settings.gifCommentBox.value + "\n ![](" + img["media"][0]["nanogif"]["url"] + ")";
        _settings.gifCommentBox.parentNode.querySelector(".emoji-wysiwyg-editor").innerText = _settings.gifCommentBox.value;
      });
      document.querySelector("#gifs-list").appendChild(element);
    };

    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var element;

      _loop();
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return;
} // function to call the trending and category endpoints


function grab_data(search_term) {
  // set the apikey and limit
  var apikey = "D68S16GQGKWB";
  var lmt = 30; // using default locale of en_US

  var search_url = "https://api.tenor.com/v1/search?tag=" + search_term + "&key=" + apikey + "&limit=" + lmt;
  httpGetAsync(search_url, tenorCallback_search); // data will be loaded by each call's callback

  return;
} // OPEN GIF BOX


function gifBoxInit() {
  var _iterator3 = _createForOfIteratorHelper(document.querySelectorAll('.special-action.gif .icon')),
      _step3;

  try {
    var _loop2 = function _loop2() {
      var gifButton = _step3.value;
      gifButton.addEventListener('click', function (event) {
        var commentsEnhancementBox = document.querySelector(".comments-enhancement-box");
        commentsEnhancementBox.style.display = "block";

        _settings.set.gifCommentBox(gifButton.closest('form').querySelector("textarea"));

        var emojiSelectionBox = commentsEnhancementBox.querySelector(".emoji-selection");
        var gifSelectionBox = commentsEnhancementBox.querySelector(".gif-selection");
        emojiSelectionBox.style.display = "none";
        gifSelectionBox.style.display = "block";
        commentsEnhancementBox.querySelector('.header-box .emoji-tab').classList.remove('selected');
        commentsEnhancementBox.querySelector('.header-box .gif-tab').classList.add('selected');
      });
    };

    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      _loop2();
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  var button = document.querySelector('#emoji-button');
  var picker = new EmojiButton();
  picker.on('emoji', function (emoji) {
    document.querySelector('input').value += emoji;
  });
  button.addEventListener('click', function () {
    picker.togglePicker(button);
  });
  (0, _util.dragElement)(document.querySelector(".comments-enhancement-box"));

  if (!document.querySelector(".gif-search").getAttribute('data-event')) {
    //I'm using "click" but it works with any event 
    // console.log(document.querySelector('.close-gif'))
    // document.querySelector('.close-gif').addEventListener('click',closeGifBox);
    $('body').on('click', '.close-gif', closeGifBox);
    document.querySelector(".gif-search").addEventListener("keyup", function (event) {
      grab_data(document.querySelector(".gif-search").value);
    });
    document.querySelector(".gif-search").setAttribute('data-event', 'true');
  }
} // CHECK CONTENT


function gifContentCheck() {
  var _iterator4 = _createForOfIteratorHelper(document.querySelectorAll(".post-body")),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var comment = _step4.value;

      while (comment.innerText.indexOf("![") >= 0) {
        var src = comment.innerHTML.substring(comment.innerHTML.indexOf("](") + 2, comment.innerHTML.indexOf(".gif)") + 4);
        var imgTag = "<img class='gif-post' src='" + src + "'></br>";

        if (comment.innerHTML.substring(comment.innerHTML.indexOf("![]") - 6, comment.innerHTML.indexOf("![]")) != "&gt;  " && comment.innerHTML.indexOf("![]") > 1) {
          imgTag = "</br>" + imgTag;
        }

        comment.innerHTML = comment.innerHTML.substring(0, comment.innerHTML.indexOf("![")) + " " + imgTag + " " + comment.innerHTML.substring(comment.innerHTML.indexOf(".gif)") + 5, comment.innerHTML.length);
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
}
/**
 * Checks for comments
 * @param {HTMLDivElement} comment comment div
 */


function singleGifComment(comment) {
  while (comment.innerText.indexOf("![") >= 0) {
    var src = comment.innerHTML.substring(comment.innerHTML.indexOf("](") + 2, comment.innerHTML.indexOf(".gif)") + 4);
    var imgTag = "<img class='gif-post' src='" + src + "'></br>";

    if (comment.innerHTML.substring(comment.innerHTML.indexOf("![]") - 6, comment.innerHTML.indexOf("![]")) != "&gt;  " && comment.innerHTML.indexOf("![]") > 1) {
      imgTag = "</br>" + imgTag;
    }

    comment.innerHTML = comment.innerHTML.substring(0, comment.innerHTML.indexOf("![")) + " " + imgTag + " " + comment.innerHTML.substring(comment.innerHTML.indexOf(".gif)") + 5, comment.innerHTML.length);
  }

  return comment;
} // FIX CLOSE GIF
// NOT WORKING !!


function closeGifBox() {
  document.querySelector(".gifs-box").style.display = "none";
  document.querySelector(".gifs-box input").value = "";

  var _iterator5 = _createForOfIteratorHelper(document.querySelectorAll("#gifs-list img")),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var img = _step5.value;
      img.parentNode.removeChild(img);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
}
},{"../../settings.js":"LXja","../util.js":"VGLh"}],"PCfX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkExpandableComments = checkExpandableComments;

var _loadComments = require("./loadComments");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function checkExpandableComments() {
  var _iterator = _createForOfIteratorHelper(document.querySelectorAll("#nodebb-comments-list li")),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var comment = _step.value;

      if (comment.querySelector("ul") && !comment.querySelector(".expandable-button")) {
        var expandableButton = document.createElement("span");
        expandableButton.classList.add("expandable-button");
        expandableButton.classList.add("expanded");
        expandableButton.innerHTML = '<i class="fad fa-comment-alt-minus"></i>';
        comment.classList.add("expandable");
        comment.classList.add("expanded");
        comment.querySelector(".topic-item > .topic-body > .topic-text > .post-content >small ").appendChild(expandableButton);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  collapseExpandCommentEvent();
}

function collapseExpandCommentEvent() {
  var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll("#nodebb-comments-list li.expandable .expandable-button")),
      _step2;

  try {
    var _loop = function _loop() {
      var expandableButton = _step2.value;
      expandableButton.addEventListener('click', function (e) {
        // collapsing
        if (expandableButton.classList.contains('expanded')) {
          var expandedButton = expandableButton;
          expandedButton.classList.remove("expanded");
          expandedButton.classList.add("collapsed");
          var expandedComment = expandedButton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
          expandedComment.classList.remove("expanded");
          expandedComment.classList.add("collapsed");
          expandedComment.querySelector("ul:first-of-type").classList.add("collapsed-comments");
          expandableButton.innerHTML = '<i class="fad fa-comment-alt-plus"></i>';
        } // expanding
        else {
            var collapsedButton = expandableButton;
            collapsedButton.classList.remove("collapsed");
            collapsedButton.classList.add("expanded");
            var collapsedComment = collapsedButton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            collapsedComment.classList.remove("collapsed");
            collapsedComment.classList.add("expanded");
            collapsedComment.querySelector("ul:first-of-type").classList.remove("collapsed-comments");
            expandableButton.innerHTML = '<i class="fad fa-comment-alt-minus"></i>';
            (0, _loadComments.setMaxHeight)(document.getElementById('nodebb-comments-list'));
          }
      });
    };

    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
},{"./loadComments":"V8ra"}],"OGtT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseNewComment = parseNewComment;

var _settings = require("../../settings.js");

var _util = require("../util.js");

function parseNewComment(post, user, token, tid, dataLevel) {
  var timestamp = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "à l'instant";
  var newComment =
  /*'<li data-pid="'+post.pid+'">'+*/
  '<div class="topic-item" data-pid="' + post.pid + '" data-userslug="' + user.userslug + '" data-uid="' + post.uid + '">' + '<div class="topic-body">' + '<div class="topic-profile-pic">' + '<a href="' + _settings.dataRes.relative_path + '/user/' + user.userslug + '">';

  if (user.picture && user.picture.length) {
    newComment += '<img src="' + user.picture + '" alt="' + user.username + '" class="profile-image" title="' + user.username + '">';
  } else {
    newComment += '<div class="profile-image" style="background-color: ' + user['icon:bgColor'] + '" title="' + user.username + '" alt="' + user.username + '">' + user['icon:text'] + '</div>';
  }

  newComment += '</a>' + '<span class="user-status user-status-comments"></span>' + '</div>' + '<div class="topic-text">' + '<div class="post-content" itemprop="text">' + '<small>' + '<a href="' + _settings.dataRes.relative_path + '/user/' + user.userslug + '" class="username" style="color: inherit; text-decoration: none;"><span data-strong-username="">' + user.username + '</span></a>' + '<div class="badges"></div>' + "<span class='post-time' data-timestamp='' title='" + (0, _util.getCurrentDate)() + "'>" + timestamp + "</span>";

  if (post.isReply) {
    newComment += '<button data-component="post/parent" class="reply-label no-select" data-topid="' + post.toPid + '">' + '<i class="icon-reply"></i> <span data-parent-username="">@' + post.parentUser.username + '</span>' + '</button>';
  }

  newComment += '<div class="menuButton-container">' + '<span class="menuButton"><i class="fad fa-caret-down"></i></span>' + '<div class="options-container">' + '<span class="edit-option"><i class="fad fa-edit"></i> Éditer</span>' + '<span class="delete-option"><i class="fad fa-trash"></i> Supprimer</span>' + '</div>' + '</div>' + '</small>' + "<div class='post-body' content=''>" + post.content + "</div>" + '<div class="nodebb-post-tools post-tools no-select">' + '<a class="upvote disabled" data-component="post/upvote" data-pid="' + post.pid + '" data-upvoted="false" data-votes="0" title="Upvote">' + '<i class="i-upvote fad fa-angle-up"></i>' + '<span class="upvote-count" style="display: none;">0</span>' + '</a>' + '<div class="posts-vote">' + '<span class="post-value">0</span>' + '</div>' + '<a class="downvote disabled" data-component="post/downvote" data-pid="' + post.pid + '" data-downvoted="false" data-votes="0" title="Downvote">' + '<i class="i-downvote fad fa-angle-down"></i>' + '</a>' + '<a class="reply" data-component="post/reply" class="reply" title="Reply">' + '<i class="fad fa-reply"></i>' + '<span class="text">Répondre</span>' + '</a>' + '<a class="quote" data-component="post/quote" class="quote" title="Quote">' + '<i class="fad fa-quote-right"></i>' + '<span class="text">Citer</span>' + '</a>' + '<a data-component="post/delete" class="delete" style="color: inherit; text-decoration: none;display: none;" title="Quote">' + 'Effacer' + '</a>' + '<a data-component="post/edit" class="edit" style="color: inherit; text-decoration: none;display: none;" title="Edit">' + 'Éditer' + '</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '<form action="' + _settings.dataRes.relative_path + '/comments/reply" method="post" class="sub-reply-input hidden">' + '<strong class="nodebb-error"></strong>' + '<textarea  class="form-control" name="content" placeholder="Ecrire une réponse" rows="5" data-emojiable="true"></textarea>' + '<div class="comments-toolbar">' + '<div class="special-box">' + '<span class="special-action emojis">' + '<i class="fad fa-smile"></i>' + '</span>' + '<span class="special-action gif">' + '<img src="https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif.svg" alt="add gif" class="icon inactive">' + '<img src="https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif-active.svg" alt="add gif" class="icon active">' + '</span>' + '</div>' + '<button data-reply-button="" class="submit-comment btn btn-primary" type="submit">Répondre à ' + user.username + '</button>' + '</div>' + '<input type="hidden" name="_csrf" value="' + token + '" />' + '<input type="hidden" name="tid" value="' + tid + '" />';

  if (dataLevel >= 1) {
    newComment += '<input type="hidden" name="toPid" value="' + post.toPid + '" />';
  } else {
    newComment += '<input type="hidden" name="toPid" value="' + post.pid + '" />';
  }

  newComment += '<input type="hidden" name="url" value="' + _settings.dataRes.redirect_url + '" />' + '</form>' + '<form action="' + _settings.dataRes.relative_path + '/comments/edit/' + post.pid + '" method="post" class="sub-edit-input hidden" data-pid="' + post.pid + '">' + '<strong class="nodebb-error"></strong>' + '<textarea  class="form-control" name="content" placeholder="Edit" rows="3" data-emojiable="true"></textarea>' + '<div class="comments-toolbar">' + '<div class="special-box">' + '<span class="special-action emojis">' + '<i class="fad fa-smile"></i>' + '</span>' + '<span class="special-action gif">' + '<img src="https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif.svg" alt="add gif" class="icon inactive">' + '<img src="https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif-active.svg" alt="add gif" class="icon active">' + '</span>' + '</div>' + '<button data-reply-button="" class="submit-comment btn btn-primary" type="submit">éditer</button>' + '</div>' + '<input type="hidden" name="_csrf" value="' + token + '" />' + '<input type="hidden" name="tid" value="' + tid + '" />' + '<input type="hidden" name="url" value="' + _settings.dataRes.redirect_url + '" />' + '</form>' + '<div data-recursive-replies=""></div>' + '</div>' + '</li>' + '<div data-recursive-replies=""></div>' + '</div>'
  /*'</li>'*/
  ;
  return newComment;
}
},{"../../settings.js":"LXja","../util.js":"VGLh"}],"Ca7Q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSocialAuthListeners = addSocialAuthListeners;

var _loadComments = require("../comments/loadComments.js");

var _modal = require("./modal.js");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Function that adds social auth link listeners
 * @param {DOMElement} modal modal element
 */
function addSocialAuthListeners(modal) {
  var _iterator = _createForOfIteratorHelper(modal.querySelectorAll("a[data-link]")),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var socialLink = _step.value;
      socialLink.addEventListener('click', function (event) {
        event.preventDefault();
        var w = window.open(this.getAttribute("data-link"), this.getAttribute("data-network"), "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes");
        var interval = setInterval(function checkSocialAuth() {
          if (w === null || w.closed === true) {
            setTimeout(_modal.closeModal, 1000);
            clearInterval(interval);
          }
        }, 1000);
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
},{"../comments/loadComments.js":"V8ra","./modal.js":"kjEe"}],"QP4Q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRegisterValidators = addRegisterValidators;

/**
* Add "blur" events that will validate the register form
* @param {DOMElement} modal modal element
*/
function addRegisterValidators(modal) {
  var email = modal.querySelector("input[name='email']");
  var emailErrors = modal.querySelector("div.email-errors");
  email.addEventListener("blur", function emailBlurListener() {
    var url = nodeBBURL + "/comments/plugin/email?email=" + encodeURIComponent(email.value);
    fetch(url).then(function (res) {
      return res.json();
    }).then(function (json) {
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
    var url = nodeBBURL + "/comments/plugin/username?username=" + encodeURIComponent(username.value);
    fetch(url).then(function (res) {
      return res.json();
    }).then(function (json) {
      if (!json.errors && json.results.exists) {
        usernameErrors.innerText = "The username is taken";
      } else {
        usernameErrors.innerText = "";
      }
    });
  });
}
},{}],"JONd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSorting = setSorting;
exports.setActiveSortingLi = setActiveSortingLi;

var _settings = require("../../settings.js");

var _loadComments = require("./loadComments.js");

/**
 * Sets a global sorting criteria
 * @param {("newest"|"oldest"|"best")} s the type of the sorting
 */
function setSorting(s) {
  _settings.set.sorting(s);

  (0, _loadComments.reloadComments)(0, 0, true, 1);
}
/**
 * Sets the current active sorting button in the comments plugin
 * @param {("newest"|"oldest"|"best")} sorting the type of the sorting
 */


function setActiveSortingLi(sorting) {
  var sorted = _settings.nodebbDiv.querySelectorAll("a.active[data-component^='sort/']");

  for (var i = 0; i < sorted.length; i++) {
    sorted[i].classList.remove("active");
  }

  var element = _settings.nodebbDiv.querySelector("a[data-component='sort/" + sorting + "']");

  if (element) {
    element.parentNode.classList.add("active");
  }
}
},{"../../settings.js":"LXja","./loadComments.js":"V8ra"}],"MTTM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emojiBoxInit = emojiBoxInit;
exports.textareaFocusChangeTarget = textareaFocusChangeTarget;

var _settings = require("../../settings.js");

var _util = require("../util.js");

function emojiBoxInit() {
  var commentsEnhancementBox = document.querySelector(".comments-enhancement-box");
  var emojiSelectionBox = commentsEnhancementBox.querySelector(".emoji-selection");
  var gifSelectionBox = commentsEnhancementBox.querySelector(".gif-selection");
  $(document).on('click', '.special-action.emojis .fa-smile', function (event) {
    commentsEnhancementBox.style.display = "block";
    emojiSelectionBox.style.display = "block";
    gifSelectionBox.style.display = "none";

    _settings.set.gifCommentBox(this.closest('form').querySelector("textarea"));

    commentsEnhancementBox.querySelector('.header-box .emoji-tab').classList.add('selected');
    commentsEnhancementBox.querySelector('.header-box .gif-tab').classList.remove('selected');
  });
  commentsEnhancementBox.querySelector('.header-box .emoji-tab').addEventListener('click', function () {
    $(_settings.gifCommentBox.closest('form').querySelector('.special-action.emojis .fa-smile')).trigger('click');
  });
  commentsEnhancementBox.querySelector('.header-box .gif-tab').addEventListener('click', function () {
    $(_settings.gifCommentBox.closest('form').querySelector('.special-action.gif .icon')).trigger('click');
  });
  textareaFocusChangeTarget();
}

function textareaFocusChangeTarget() {
  var commentsEnhancementBox = document.querySelector(".comments-enhancement-box");

  function focusHandler() {
    if (!(0, _util.isHidden)(commentsEnhancementBox)) {
      console.log('!hidden');
      var selectedTab = commentsEnhancementBox.querySelector('.selected');
      console.log(selectedTab);

      if ($(selectedTab).hasClass('gif-tab')) {
        console.log('gif');
        $(this.closest('form').querySelector('.special-action.gif .icon')).trigger('click');
      } else if ($(selectedTab).hasClass('emoji-tab')) {
        console.log('emoji');
        $(this.closest('form').querySelector('.special-action.emojis .fa-smile')).trigger('click');
      }
    } else {
      console.log('hidden');
    }
  }

  $(document).on('click', '.emoji-wysiwyg-editor', focusHandler);
}
},{"../../settings.js":"LXja","../util.js":"VGLh"}],"w7Fc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadInit = uploadInit;

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/******* UPLOAD FILES *******/
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

function uploadInit() {
  var _iterator = _createForOfIteratorHelper(document.querySelectorAll(".special-action.img")),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var icon = _step.value;
      icon.addEventListener('click', function (event) {
        $("#formupload #file").attr("focused", "1");
        $("#formupload #file").trigger("click");
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  $("#formupload #file").on("change", function (e) {
    e.preventDefault();
    var formData = new FormData(document.getElementById("formupload")); // formData.append(f.attr("name"), $(this)[0].files[0]);

    console.log("before");
    console.log(formData);
  });
}
},{}],"xsmJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawComments = drawComments;
exports.bindEvents = bindEvents;
exports.addBadges = addBadges;
exports.createNestedComments = createNestedComments;

var _settings = require("../../settings.js");

var _util = require("./../util.js");

var _modal = require("../login/modal.js");

var _social = require("../login/social.js");

var _form = require("../login/form.js");

var _loadComments = require("./loadComments.js");

var _sortComments = require("./sortComments.js");

var _api = require("../api.js");

var _expandComments = require("./expandComments.js");

var _onload = require("../onload.js");

var _gifs = require("../addons/gifs.js");

var _emoji = require("../addons/emoji.js");

var _upload = require("../addons/upload.js");

var _util2 = require("../util.js");

var _wordpress = require("../../integration/wordpress.js");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// import $ from 'jquery';
// window.drawComments = drawComments
function drawComments() {
  var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  function afterCommentsDomLoaded(data, res) {
    (0, _util.reactElementRelocation)();
    checkImgProfile();

    if (data.isValid && _settings.firstTime) {
      (0, _loadComments.addFooterText)();

      _settings.set.firstTime(false);
    }

    if (data.isValid && !data.isLastPage) {
      (0, _loadComments.loadMoreEvent)();
      (0, _loadComments.showLoadMore)();
    } else {
      (0, _loadComments.hideLoadMore)();
    }

    if (_settings.pagination == 0 && !_settings.reload) {
      $("#nodebb-comments-list").css('min-height', 0);
    } else {
      $("#nodebb-comments-list").css('min-height', $("#nodebb-comments-list").height());
    }

    $("body").removeClass("loadmore");

    if (_settings.reload && !(0, _wordpress.checkIfWpAdmin)()) {
      (0, _loadComments.reloadComments)(_settings.pagination, _settings.page + 1, false);
    }

    prepareSignout(data.token);

    if ((0, _wordpress.checkIfWpAdmin)()) {
      if (res.length < i) drawComments(res, i);
    }

    (0, _loadComments.moveLoadMoreDoms)();
    (0, _loadComments.newerCommentsEvents)();

    _settings.set.activeUserCommentsReset([]);

    (0, _util.dispatchEmojis)();
    (0, _emoji.emojiBoxInit)();
  }

  (0, _util.removeLoader)();

  if ((0, _wordpress.checkIfWpAdmin)() || _settings.XHR.status >= 200 && _settings.XHR.status < 400) {
    var data = {},
        html;

    if (!(0, _wordpress.checkIfWpAdmin)()) {
      data = JSON.parse(_settings.XHR.responseText);
    } else {
      if (!res) res = JSON.parse(_settings.XHR.responseText);
      console.log("WpAdmin");
      console.log(res);
      data = res[i];
      i++;
    } // /!\ DEV /!\ CHECK SORTING (Compare with LOCALSTORAGE)


    (0, _sortComments.setActiveSortingLi)(_settings.sorting, data.sorting);

    _settings.set.commentsDiv(document.getElementById("nodebb-comments-list"));

    _settings.set.commentsCounter(document.getElementById("nodebb-comments-count"));

    _settings.set.commentsAuthor(document.getElementById("nodebb-comments-author"));

    _settings.set.commentsCategory(document.getElementById("nodebb-comments-category"));

    _settings.set.timestamp(data.timestamp);

    _settings.set.postTemplate(data.singleCommentTpl);

    _settings.set.wholeTemplate(data.template);

    data.relative_path = nodeBBURL;
    data.redirect_url = _settings.articlePath;
    data.article_id = articleID;
    data.article_title = articleTitle;
    data.pagination = _settings.pagination;
    data.blogger = blogger;
    data.category_id = categoryID;
    data.postCount = parseInt(data.postCount, 10);
    var flagVote = false;

    _settings.set.dataRes(data);

    console.log(data);
    setTimeout(function () {
      (0, _modal.grecaptchaGrab)();
      var body = document.querySelector("body");
      var loginModal = (0, _modal.prepareModal)(data.loginModalTemplate, data.token, _modal.onSubmitLogin);
      (0, _social.addSocialAuthListeners)(loginModal); // body.appendChild(loginModal);

      document.querySelector("#nodebb").appendChild(loginModal);
      var registerModal = (0, _modal.prepareModal)(data.registerModalTemplate, data.token, _modal.onSubmitSignUp);
      (0, _form.addRegisterValidators)(registerModal);
      (0, _social.addSocialAuthListeners)(registerModal); // body.appendChild(registerModal);

      document.querySelector("#nodebb").appendChild(registerModal);
    }, 0);

    for (var post in data.posts) {
      if (data.posts.hasOwnProperty(post)) {
        if (data.posts[post]["blog-comments:url"]) {
          delete data.posts[post];
        }
      }
    }

    (0, _util.addTimeAgoRecursive)(data.posts);
    data.posts = _settings.postData.concat(data.posts);

    _settings.postData.push.apply(_settings.postData, data.posts);

    if (_settings.commentsCounter) {
      _settings.commentsCounter.innerHTML = data.postCount ? data.postCount - 1 : 0;
    }

    if (_settings.commentsCategory) {
      _settings.commentsCategory.innerHTML = '<a href="' + nodeBBURL + "/category/" + data.category.slug + '">' + data.category.name + "</a>";
    }

    if (_settings.commentsAuthor) {
      _settings.commentsAuthor.innerHTML = '<span class="nodebb-author"><img src="' + data.mainPost.user.picture + '" /> <a href="' + nodeBBURL + "/user/" + data.mainPost.user.userslug + '">' + data.mainPost.user.username + "</a></span>";
    } // ------ PARSE of Comments


    html = parse(data, data.template); // Appending to DOM

    _settings.nodebbDiv.innerHTML = (0, _util.normalizePost)(html);

    var nodebbCommentsList = _settings.nodebbDiv.querySelector("#nodebb-comments-list");

    (0, _emoji.emojiBoxInit)();
    (0, _gifs.gifBoxInit)(); // Add Sorts

    (0, _sortComments.setActiveSortingLi)(_settings.sorting); // SORTING COMPONENT

    _settings.nodebbDiv.querySelector("a[data-component='sort/best']").addEventListener("click", function () {
      return (0, _sortComments.setSorting)("best");
    });

    _settings.nodebbDiv.querySelector("a[data-component='sort/newest']").addEventListener("click", function () {
      return (0, _sortComments.setSorting)("newest");
    });

    _settings.nodebbDiv.querySelector("a[data-component='sort/oldest']").addEventListener("click", function () {
      return (0, _sortComments.setSorting)("oldest");
    }); // Dont know this


    _settings.set.contentDiv(document.getElementById("nodebb-content"));

    if (_settings.savedText) {
      _settings.contentDiv.value = _settings.savedText;
    }

    if (_settings.nodebbDiv.querySelector('#nodebb-login')) {
      _settings.nodebbDiv.querySelector('#nodebb-login').addEventListener('click', function () {
        (0, _modal.authenticate)("login");
      });
    }

    (0, _loadComments.commentSubmissionsHandler)(_settings.nodebbDiv.querySelector('form.top-post-form'));

    var _iterator = _createForOfIteratorHelper(nodebbCommentsList.querySelectorAll('li')),
        _step;

    try {
      var _loop = function _loop() {
        var li = _step.value;

        if (!li.getAttribute('data-event')) {
          li.querySelector('.post-body').innerHTML = li.querySelector('.post-body').innerHTML.replace('\n', '<br>');
          bindEvents(data.user, li);

          var _post = data.posts.find(function (p) {
            return p.pid == li.getAttribute('data-pid');
          });

          if (_post && li.closest('ul').getAttribute('id') == 'nodebb-comments-list') {
            addBadges(li, _post);
          }
        }
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  afterCommentsDomLoaded(data, res);
}

function bindEvents(user, li) {
  function eventAuth() {
    if (!user || !user.uid) {
      (0, _modal.authenticate)("login");
      return false;
    }

    return true;
  }

  function initClick(element) {
    var dataComponent = element.getAttribute("data-component");
    var topicItem = event.target;
    var upvoted = JSON.parse(element.getAttribute("data-upvoted"));
    var downvoted = JSON.parse(element.getAttribute("data-downvoted"));

    while (topicItem && !topicItem.classList.contains("topic-item")) {
      topicItem = topicItem.parentElement;
    }

    var postBody;

    if (/\/(quote|edit)$/.test(dataComponent)) {
      postBody = topicItem.querySelector(".post-content .post-body");
    }

    var pid = topicItem.getAttribute("data-pid");
    var uid = topicItem.getAttribute("data-uid");
    var level = topicItem.getAttribute("data-level");
    var formClass = /\/edit$/.test(dataComponent) ? ".sub-edit-input" : ".sub-reply-input";
    var elementForm = topicItem.querySelector("form" + formClass);
    var formInput = elementForm.querySelector("textarea");

    var nodebbCommentsList = _settings.nodebbDiv.querySelector("#nodebb-comments-list");

    var visibleForm = nodebbCommentsList.querySelector("li .topic-item form:not(.hidden)"); // Hide all other forms

    if (visibleForm && visibleForm !== elementForm) {
      topicItem.classList.remove("replying");
      topicItem.classList.remove("quoting");
      visibleForm.classList.add("hidden");
      var cl = visibleForm.closest('.replying');

      if (cl) {
        // console.log('remove replying')
        cl.classList.remove('replying');
      }

      cl = visibleForm.closest('.quoting');

      if (cl) {
        // console.log('remove replying')
        cl.classList.remove('quoting');
      }
    }

    return {
      topicItem: topicItem,
      pid: pid,
      uid: uid,
      level: level,
      elementForm: elementForm,
      formInput: formInput,
      dataComponent: dataComponent,
      postBody: postBody,
      upvoted: upvoted,
      downvoted: downvoted
    };
  }

  var flagVote = false;

  if (_settings.dataRes.isAdmin || li.querySelector('.topic-item').getAttribute('data-uid') == _settings.dataRes.user.uid) {
    commentOptions();
  } else {
    (0, _util.removeNodes)(li.querySelector(".menuButton-container"));
  }

  li.setAttribute('data-event', 'true'); // Reply CLick

  li.querySelector('[data-component="post/reply"]').addEventListener('click', function () {
    if (!eventAuth()) return false;
    $('.editing').removeClass('hidden').removeClass('editing');

    var _initClick = initClick(this),
        topicItem = _initClick.topicItem,
        pid = _initClick.pid,
        uid = _initClick.uid,
        level = _initClick.level,
        elementForm = _initClick.elementForm,
        formInput = _initClick.formInput,
        dataComponent = _initClick.dataComponent,
        postBody = _initClick.postBody,
        upvoted = _initClick.upvoted,
        downvoted = _initClick.downvoted; // Click to hide


    if (topicItem.classList.contains("replying")) {
      topicItem.classList.remove("replying");
      elementForm.classList.add("hidden");
      if (!elementForm.parentNode.parentNode.classList.contains('collapsed')) (0, _loadComments.setMaxHeight)(document.querySelector("#nodebb-comments-list")); // click to reply
    } else {
      formInput.value = '';
      elementForm.querySelector(".emoji-wysiwyg-editor").innerHTML = '';
      topicItem.classList.add("replying");
      topicItem.classList.remove("quoting");
      elementForm.classList.remove("hidden");
      if (!elementForm.parentNode.parentNode.classList.contains('collapsed')) (0, _loadComments.setMaxHeight)(document.querySelector("#nodebb-comments-list"));

      if (level >= 2) {
        var atStr = "@" + topicItem.getAttribute("data-userslug") + ":";
        formInput.value = atStr + " ";
        elementForm.querySelector(".emoji-wysiwyg-editor").innerHTML = atStr + " ";
      }
    }
  }); // Quote Click

  li.querySelector('[data-component="post/quote"]').addEventListener('click', function () {
    if (!eventAuth()) return false;
    $('.editing').removeClass('hidden').removeClass('editing');

    var _initClick2 = initClick(this),
        topicItem = _initClick2.topicItem,
        pid = _initClick2.pid,
        uid = _initClick2.uid,
        level = _initClick2.level,
        elementForm = _initClick2.elementForm,
        formInput = _initClick2.formInput,
        dataComponent = _initClick2.dataComponent,
        postBody = _initClick2.postBody,
        upvoted = _initClick2.upvoted,
        downvoted = _initClick2.downvoted; //  Click to hide


    if (topicItem.classList.contains("quoting")) {
      topicItem.classList.remove("quoting");
      elementForm.classList.add("hidden");
      if (!elementForm.parentNode.parentNode.classList.contains('collapsed')) (0, _loadComments.setMaxHeight)(document.querySelector("#nodebb-comments-list")); // Click to quote
    } else {
      formInput.value = '';
      elementForm.querySelector(".emoji-wysiwyg-editor").innerHTML = '';
      topicItem.classList.add("quoting");
      topicItem.classList.remove("replying");
      var quote = (postBody.getAttribute('content') ? postBody.getAttribute('content') : postBody.textContent).split("\n").map(function (line) {
        return line ? "> " + line : line;
      }).join(" \n ");
      formInput.value = "@" + topicItem.getAttribute("data-userslug") + " said:\n" + quote;
      elementForm.querySelector(".emoji-wysiwyg-editor").innerHTML = "@" + topicItem.getAttribute("data-userslug") + " said:\n" + quote;
      elementForm.classList.remove("hidden");
      if (!elementForm.parentNode.parentNode.classList.contains('collapsed')) (0, _loadComments.setMaxHeight)(document.querySelector("#nodebb-comments-list"));
    }
  }); // Upvote click

  li.querySelector('[data-component="post/upvote"]').addEventListener('click', function () {
    var _this = this;

    if (!eventAuth()) return false;
    $('.editing').removeClass('hidden').removeClass('editing');

    var _initClick3 = initClick(this),
        topicItem = _initClick3.topicItem,
        pid = _initClick3.pid,
        uid = _initClick3.uid,
        level = _initClick3.level,
        elementForm = _initClick3.elementForm,
        formInput = _initClick3.formInput,
        dataComponent = _initClick3.dataComponent,
        postBody = _initClick3.postBody,
        upvoted = _initClick3.upvoted,
        downvoted = _initClick3.downvoted;

    if (user.uid != uid) {
      var downvoteElement = this.parentNode.querySelector('.downvote');
      var wasDownvoted = downvoteElement.getAttribute('data-downvoted');

      if (!flagVote) {
        flagVote = true;
        (0, _api.upvotePost)(topicItem, pid, upvoted).then(function () {
          flagVote = false;

          var postValue$ = _this.parentNode.querySelector('span.post-value');

          _this.setAttribute('data-upvoted', !upvoted);

          downvoteElement.setAttribute('data-downvoted', false); // Removing upvote

          if (upvoted == true) {
            postValue$.innerText = Number(postValue$.innerHTML) - 1; // Upvoting a downvoted comment
          } else if (wasDownvoted == 'true') {
            postValue$.innerText = Number(postValue$.innerHTML) + 2; // Upvoting a comment without vote
          } else {
            postValue$.innerText = Number(postValue$.innerHTML) + 1;
          }
        }).catch(console.log);
      }
    }
  }); // Downvote click

  li.querySelector('[data-component="post/downvote"]').addEventListener('click', function () {
    var _this2 = this;

    if (!eventAuth()) return false;
    $('.editing').removeClass('hidden').removeClass('editing');

    var _initClick4 = initClick(this),
        topicItem = _initClick4.topicItem,
        pid = _initClick4.pid,
        uid = _initClick4.uid,
        level = _initClick4.level,
        elementForm = _initClick4.elementForm,
        formInput = _initClick4.formInput,
        dataComponent = _initClick4.dataComponent,
        postBody = _initClick4.postBody,
        upvoted = _initClick4.upvoted,
        downvoted = _initClick4.downvoted;

    if (user.uid != uid) {
      var upvoteElement = this.parentNode.querySelector('.upvote');
      var wasUpvoted = upvoteElement.getAttribute('data-upvoted');

      if (!flagVote) {
        flagVote = true;
        (0, _api.downvotePost)(topicItem, pid, downvoted).then(function () {
          flagVote = false;

          var postValue$ = _this2.parentNode.querySelector('span.post-value');

          _this2.setAttribute('data-downvoted', !downvoted);

          upvoteElement.setAttribute('data-upvoted', false); // Removing downvote

          if (downvoted) {
            postValue$.innerText = Number(postValue$.innerHTML) + 1; // Downvoting an upvoted comment
          } else if (wasUpvoted == 'true') {
            postValue$.innerText = Number(postValue$.innerHTML) - 2; // Downvoting a comment without vote
          } else {
            postValue$.innerText = Number(postValue$.innerHTML) - 1;
          }
        }).catch(console.log);
      }
    }
  });

  var _iterator2 = _createForOfIteratorHelper(li.querySelectorAll('form')),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var form = _step2.value;
      (0, _loadComments.commentSubmissionsHandler)(form);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  (0, _gifs.gifContentCheck)();
  (0, _expandComments.checkExpandableComments)();
  (0, _util.dispatchEmojis)();
  (0, _gifs.gifBoxInit)();
}

function addBadges(li, post) {
  var pid = li.getAttribute('data-pid');
  var selectedGroups = post.user.selectedGroups;

  if (selectedGroups) {
    var maxCrypto = 0;
    var maxWebsites = 0;

    var _iterator3 = _createForOfIteratorHelper(selectedGroups),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var group = _step3.value;

        if ((group.name === "Bitcoin" || group.name === "Ethereum") && maxCrypto < 2) {
          var groupDiv = document.createElement('div');
          groupDiv.classList.add('group-badge');
          var span = document.createElement('span');
          span.innerText = " ";
          span.classList.add('crypto-badge');
          var url = 'https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/img/badges/' + group.name.toLowerCase() + '.svg';
          var image = new Image();
          image.src = url;
          span.appendChild(image);
          groupDiv.appendChild(span);
          maxCrypto = maxCrypto + 1;
          li.querySelector('.badges').appendChild(groupDiv);
        } else if ((group.name === "bitcoin.fr" || group.name === "Journalducoin" || group.name === "TheCoinTribune" || group.name === "administrators") && maxWebsites < 1) {
          var _groupDiv = document.createElement('div');

          _groupDiv.classList.add('group-badge');

          var _span = document.createElement('span');

          _span.innerText = " ";

          _span.classList.add('website-badge');

          if (group.name === "bitcoin.fr") {
            _span.style.backgroundColor = '#318CE7';
          } else if (group.name === "Journalducoin") {
            _span.style.backgroundColor = '#01528C';

            _span.classList.add('journalducoin');
          } else if (group.name === "administrators") {
            group.name = "CryptoFR";
            _span.style.backgroundColor = '#434A81';
          } else if (group.name === "TheCoinTribune") {
            _span.style.backgroundColor = '#1678c1';
          }

          var _url = 'https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/img/badges/' + group.name.toLowerCase() + '.svg';

          var _image = new Image();

          _image.src = _url;

          _span.appendChild(_image);

          _groupDiv.appendChild(_span);

          maxWebsites = maxWebsites + 1;
          li.querySelector('.badges').appendChild(_groupDiv);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }

  if (post.hasOwnProperty('children')) {
    var _iterator4 = _createForOfIteratorHelper(post.children),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var childPost = _step4.value;
        var childLi = li.querySelector('li[data-pid="' + childPost.pid + '"]');

        if (!childLi) {
          console.log('error of childLi on addBadges', childLi);
        } else {
          addBadges(childLi, childPost);
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }
}

function prepareSignout(token) {
  // console.log('calling prepare signout', $(".logout-box"))
  $(".logout-box").click(function () {
    (0, _api.logout)(token);
    setTimeout(function () {
      return (0, _loadComments.reloadComments)(0, 0, false);
    }, 1000);
  });
}

function checkImgProfile() {
  if (document.querySelector(".first-image img")) {
    if (document.querySelector(".first-image img").getAttribute("src") == "") $(".first-image img.profile-image").remove();else $(".first-image div.profile-image").remove();
  }
}
/**
 * Parses template
 * @param {Object} data the data to be put on the template
 * @returns {String} parsed template
 */


function parse(data, template) {
  function replace(key, value, template) {
    var searchRegex = new RegExp("{" + key + "}", "g");
    return template.replace(searchRegex, value);
  }

  function makeRegex(block) {
    return new RegExp("<!--[\\s]*BEGIN " + block + "[\\s]*-->[\\s\\S]*<!--[\\s]*END " + block + "[\\s]*-->", "g");
  }

  function makeConditionalRegex(block) {
    return new RegExp("<!--[\\s]*IF " + block + "[\\s]*-->([\\s\\S]*?)<!--[\\s]*ENDIF " + block + "[\\s]*-->", "g");
  }

  function getBlock(regex, block, template) {
    data = template.match(regex);
    if (data == null) return;
    if (block !== undefined) _settings.templates.blocks[block] = data[0];
    var begin = new RegExp("(\r\n)*<!-- BEGIN " + block + " -->(\r\n)*", "g"),
        end = new RegExp("(\r\n)*<!-- END " + block + " -->(\r\n)*", "g"),
        data = data[0].replace(begin, "").replace(end, "");
    return data;
  }

  function setBlock(regex, block, template) {
    return template.replace(regex, block);
  }

  var regex, block;
  return function parse(data, namespace, template, blockInfo) {
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
          var statement = new RegExp("(<!--[\\s]*IF " + key + "[\\s]*-->)|(<!--[\\s]*ENDIF " + key + "[\\s]*-->)", "gi");

          if (conditionalBlock[1]) {
            // there is an else statement
            if (!value) {
              template = template.replace(matches[i], conditionalBlock[1].replace(statement, ""));
            } else {
              template = template.replace(matches[i], conditionalBlock[0].replace(statement, ""));
            }
          } else {
            // regular if statement
            if (!value) {
              template = template.replace(matches[i], "");
            } else {
              template = template.replace(matches[i], matches[i].replace(statement, ""));
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
              block = getBlock(regex, namespace.substring(0, namespace.length - 1), template);

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
              value = typeof data[d] === "string" ? data[d].replace(/^\s+|\s+$/g, "") : data[d];
          checkConditional(key, value);
          checkConditional("!" + key, !value);

          if (blockInfo && blockInfo.iterator) {
            checkConditional("@first", blockInfo.iterator === 0);
            checkConditional("!@first", blockInfo.iterator !== 0);
            checkConditional("@last", blockInfo.iterator === blockInfo.total);
            checkConditional("!@last", blockInfo.iterator !== blockInfo.total);
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
      template = template.replace(/<!-- ELSE -->/gi, "ENDIF -->").replace(/<!-- IF([^@]*?)ENDIF([^@]*?)-->/gi, "");
    }

    var divPost = document.createElement("div");
    divPost.innerHTML = _settings.postTemplate;
    var div = document.createElement("div");
    div.innerHTML = template; // console.log(div)

    if (data && data.hasOwnProperty("posts")) {
      // TODO try to use parse function again
      var nested = createNestedComments(data.posts, divPost.querySelector("li"), data);
      var loadedComments = document.createElement('div');
      loadedComments.innerHTML = nested.innerHTML;
      var existingComments = document.querySelector("#nodebb-comments-list");
      if (_settings.reloading) loadedComments = checkNewComments(existingComments, loadedComments);

      if (div.querySelector("#nodebb-comments-list")) {
        if (_settings.pagination == 0 || _settings.page == 0 && _settings.reload) {
          div.querySelector("#nodebb-comments-list").innerHTML = loadedComments.innerHTML;
        } else {
          // old comments
          div.querySelector("#nodebb-comments-list").innerHTML = document.querySelector("#nodebb-comments-list").innerHTML;
          $($(div).find("#nodebb-comments-list li,#nodebb-comments-list li form")).removeAttr('data-event'); // new comments

          div.querySelector("#nodebb-comments-list").appendChild(loadedComments); // div.querySelector("#nodebb-comments-list").insertAdjacentHTML( 'beforeend', loadedComments.innerHTML );
        }
      }

      if ((0, _wordpress.checkIfWpAdmin)()) {
        console.log(document.querySelectorAll("#nodebb-comments-list"));

        var _iterator5 = _createForOfIteratorHelper(document.querySelectorAll("#nodebb-comments-list")),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var commentUL = _step5.value;
            if (commentUL.getAttribute('data-mainpid') != data.mainPost.pid) parentNodebbComments.appendChild(commentUL);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }

      template = div.innerHTML;
    }

    return template;
  }(data, "", template);
}
/**
 * Check new comments
 * <<CORRECT>> @param {Object} data the data to be put on the template
 * @returns {Array} of loaded comments
 */


function checkNewComments(existingComments, loadedComments) {
  var _iterator6 = _createForOfIteratorHelper(loadedComments.querySelectorAll("li")),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var comment = _step6.value;
      var flag = false;

      var _iterator7 = _createForOfIteratorHelper(existingComments.querySelectorAll("li")),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var oldcomment = _step7.value;
          if (comment.getAttribute("data-pid") == oldcomment.getAttribute("data-pid") && !oldcomment.classList.contains('new-comment')) flag = true;
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      if (!flag) {
        comment.classList.add("new-comment");
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }

  _settings.set.reloading(0);

  return loadedComments;
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
      form.setAttribute("action", relativePath + "/comments/edit/" + form.getAttribute("data-pid"));
    }

    (0, _util.changeAttribute)(form.querySelectorAll('input[name="_csrf"]'), "value", token);
    (0, _util.changeAttribute)(form.querySelectorAll('input[name="tid"]'), "value", tid);
    (0, _util.changeAttribute)(form.querySelectorAll('input[name="url"]'), "value", redirectURL);
    var toPid = level >= 2 ? comment.toPid : comment.pid;
    (0, _util.changeAttribute)(form.querySelectorAll('input[name="toPid"]'), "value", toPid);
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
    var clone = template.cloneNode(true); // Here we should manipulate the node

    clone.setAttribute("data-pid", comment.pid);
    clone.querySelector("div.topic-item").setAttribute("data-level", level);
    clone.querySelector("span.user-status").classList.add(comment.user.status);
    (0, _util.changeAttribute)(clone.querySelectorAll("[data-pid]"), "data-pid", comment.pid);
    (0, _util.changeAttribute)(clone.querySelectorAll("[data-uid]"), "data-uid", comment.uid);
    (0, _util.changeAttribute)(clone.querySelectorAll("[data-userslug]"), "data-userslug", comment.user.userslug);
    (0, _util.changeAttribute)(clone.querySelectorAll("[data-bookmarked]"), "data-bookmarked", comment.bookmarked);
    (0, _util.changeAttribute)(clone.querySelectorAll("[data-upvoted]"), "data-upvoted", comment.upvoted);
    (0, _util.changeAttribute)(clone.querySelectorAll("[data-downvoted]"), "data-downvoted", comment.downvoted);
    (0, _util.changeAttribute)(clone.querySelectorAll("[data-votes]"), "data-votes", comment.votes);
    var forms = clone.querySelectorAll("form");
    forms.forEach(function (f) {
      return changeFormValue(comment, f, level);
    });
    var upvoteCountEl = clone.querySelector("span.upvote-count");

    if (comment.votes) {
      upvoteCountEl.classList.remove("hidden");
      upvoteCountEl.innerText = comment.votes;
    } else {
      upvoteCountEl.classList.add("hidden");
    }

    clone.querySelector("span.post-value").innerText = "" + comment.votes;
    clone.querySelector("button[data-reply-button]").innerHTML = "<span>Répondre à " + comment.user.username + '</span><i class="fad fa-circle-notch fa-spin"></i>';
    (0, _util.addClassHelper)(clone.querySelector("i.i-upvote"), comment.upvoted, "icon-thumbs-up-alt", "icon-thumbs-up");
    (0, _util.addClassHelper)(clone.querySelector("i.i-bookmark"), comment.bookmarked, "icon-bookmark", "icon-bookmark-empty");
    (0, _util.addClassHelper)(clone.querySelector("i.i-downvote"), comment.downvoted, "icon-thumbs-down-alt", "icon-thumbs-down");
    clone.querySelector("div.post-body").setAttribute("content", comment.content);
    clone.querySelector("div.post-body").innerHTML = (0, _util2.parseCommentQuotes)(comment.content);
    clone.querySelector("div.post-body").innerHTML = (0, _util2.parseLineBreaks)(clone.querySelector("div.post-body").innerHTML);
    var img = clone.querySelector("img.profile-image");
    var divImgText = clone.querySelector("div.profile-image");

    if (comment.user.picture) {
      (0, _util.changeAttribute)(img, "src", comment.user.picture);
      (0, _util.changeAttribute)(img, "alt", comment.user.username);
      (0, _util.changeAttribute)(img, "title", comment.user.username);
      divImgText.style.display = "none";
      (0, _util.removeNodes)(divImgText);
    } else {
      (0, _util.changeAttribute)(divImgText, "title", comment.user.username);
      (0, _util.changeAttribute)(divImgText, "alt", comment.user.username);
      divImgText.innerText = comment.user["icon:text"];
      divImgText.style.backgroundColor = comment.user["icon:bgColor"];
      img.style.display = "none";
      (0, _util.removeNodes)(img);
    }

    clone.querySelector(".topic-profile-pic").querySelector('a').setAttribute('href', relativePath + "/user/" + comment.user.userslug);
    clone.querySelector("a.username").setAttribute('href', relativePath + "/user/" + comment.user.userslug);
    clone.querySelector("span[data-strong-username]").innerText = comment.user.username;

    if (comment.parent && comment.parent.username) {
      clone.querySelector("span[data-parent-username]").innerText = "@" + comment.parent.username; // We update here because in another method timestamps are updated for parent comments

      if (typeof comment.timestamp === "number") {
        comment.timestamp = (0, _util.timeAgo)(parseInt(comment.timestamp, 10));
      }
    } else {
      (0, _util.removeNodes)(clone.querySelector("button.reply-label"));
    } // If connected user is owner of comment


    if (comment.uid !== uid && !_settings.dataRes.isAdmin) {
      (0, _util.removeNodes)(clone.querySelector("a.edit"));
      (0, _util.removeNodes)(clone.querySelector("a.delete"));
      (0, _util.removeNodes)(clone.querySelector(".menuButton-container"));
    }

    clone.querySelector("span[data-timestamp]").setAttribute("title", comment.timestampISO.split("T")[0]);
    clone.querySelector("span[data-timestamp]").innerText = comment.timestamp;

    if (uid === comment.user.uid) {
      var todisableAnchors = clone.querySelectorAll('a[data-component="post/upvote"], a[data-component="post/downvote"]');

      for (var i = 0; i < todisableAnchors.length; i++) {
        todisableAnchors[i].classList.add("disabled");
      }
    } // Finish manipulation


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
 * DISPLAY OPTIONS
 * WHY with JS??
 */


function commentOptions() {
  $(document).click(function (e) {
    var container = $(".menuButton");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $(".options-container").hide();
    }
  });
  $(document).mouseover(function (e) {
    var container = $("#nodebb-comments-list .topic-body");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $(".options-container").hide();
    }
  });

  var _iterator8 = _createForOfIteratorHelper(document.querySelectorAll("#nodebb-comments-list .topic-body")),
      _step8;

  try {
    var _loop2 = function _loop2() {
      var comment = _step8.value;

      if (comment.querySelector(".options-container .edit-option") && !comment.closest('li').getAttribute('data-event')) {
        // Edit Click
        comment.querySelector(".options-container .edit-option").addEventListener("click", function () {
          var nodebbCommentsList = _settings.nodebbDiv.querySelector("#nodebb-comments-list");

          var visibleForm = nodebbCommentsList.querySelector("li .topic-item form:not(.hidden)");
          if (visibleForm) visibleForm.classList.add('hidden');
          $('.editing').removeClass('hidden').removeClass('editing');
          $('.replying, .quoting').removeClass('replying').removeClass('quoting');
          comment.parentNode.querySelector(".sub-edit-input").classList.remove("hidden");
          comment.parentNode.querySelector(".sub-edit-input textarea").value = comment.parentNode.querySelector(".post-body").getAttribute("content");
          comment.parentNode.querySelector(".sub-edit-input .emoji-wysiwyg-editor").innerText = comment.parentNode.querySelector(".post-body").getAttribute("content").replace(/<br>|&lt;br&gt;/ig, '\n').replace(/(<([^>]+)>)/ig, "");
          comment.querySelector('.post-body').classList.add('hidden');
          comment.querySelector('.post-tools').classList.add('hidden');
          comment.querySelector('.post-body').classList.add('editing');
          comment.querySelector('.post-tools').classList.add('editing');
          setTimeout(function () {
            (0, _loadComments.setMaxHeight)(document.getElementById('nodebb-comments-list'));
          }, 0);
        }); // Delete Click

        comment.querySelector(".options-container .delete-option").addEventListener("click", function () {
          if (comment.querySelector('.confirm-delete')) return;
          var div = document.createElement('div');
          div.classList.add('confirm-delete');
          var buttonYes = document.createElement('button');
          buttonYes.classList.add('YesDelete');
          buttonYes.innerText = "Yes";
          var buttonNo = document.createElement('button');
          buttonNo.classList.add('NoDelete');
          buttonNo.innerText = "No";
          var p = document.createElement('p');
          p.innerText = "Are you sure you want to delete this comment?";
          div.append(p);
          div.append(buttonYes);
          div.append(buttonNo);
          comment.append(div);
          buttonYes.addEventListener('click', function () {
            (0, _api.deletePost)(comment.parentNode, comment.parentNode.getAttribute("data-pid")).then(function () {
              _settings.set.reload(true);

              (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
            }).catch(console.log);
            (0, _util.removeNodes)(div);
          });
          buttonNo.addEventListener('click', function () {
            (0, _util.removeNodes)(div);
          });
        });
      }

      var _iterator9 = _createForOfIteratorHelper(comment.querySelectorAll(".menuButton")),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var button = _step9.value;
          button.addEventListener("click", function () {
            comment.querySelector(".options-container").style.display = "block";
          });
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    };

    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      _loop2();
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
}
},{"../../settings.js":"LXja","./../util.js":"VGLh","../login/modal.js":"kjEe","../login/social.js":"Ca7Q","../login/form.js":"QP4Q","./loadComments.js":"V8ra","./sortComments.js":"JONd","../api.js":"gYYA","./expandComments.js":"PCfX","../onload.js":"sutU","../addons/gifs.js":"XBBC","../addons/emoji.js":"MTTM","../addons/upload.js":"w7Fc","../util.js":"VGLh","../../integration/wordpress.js":"poQx"}],"V8ra":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadMoreEvent = loadMoreEvent;
exports.moveLoadMoreDoms = moveLoadMoreDoms;
exports.showLoadMore = showLoadMore;
exports.hideLoadMore = hideLoadMore;
exports.addFooterText = addFooterText;
exports.createSnackbar = createSnackbar;
exports.reloadComments = reloadComments;
exports.newCommentsCheck = newCommentsCheck;
exports.newerCommentsEvents = newerCommentsEvents;
exports.commentSubmissionsHandler = commentSubmissionsHandler;
exports.formSubmitError = formSubmitError;
exports.setMaxHeight = setMaxHeight;

var _settings = require("../../settings.js");

var _util = require("../util.js");

var _api = require("../api.js");

var _wordpress = require("../../integration/wordpress.js");

var _gifs = require("../addons/gifs.js");

var _expandComments = require("./expandComments.js");

var _newComment = require("./newComment.js");

var _drawComments = require("./drawComments.js");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function loadMoreEvent() {
  var button = document.querySelector("#nodebb-load-more");
  button.addEventListener("click", function loadMoreClick() {
    if (!$("body").hasClass("hasLoader")) {
      reloadComments(_settings.pagination + 1);
    }
  });
}

function moveLoadMoreDoms() {
  $(".load-more-text").insertAfter('#nodebb-comments-list');
  $('.load-more-div').insertAfter('#nodebb-comments-list');
  document.querySelector(".load-more-text").innerHTML = '<span class="nodebb-copyright">Propulsé par <a href="' + _settings.dataRes.relative_path + '" class="comment-logo" target="_blank"><img src="' + _settings.dataRes.relative_path + '/plugins/nodebb-plugin-blog-comments-cryptofr/icons/cryptofr-comments.svg" alt="add emojis" class="icon"></a> <span class="hide-mobile">&bull;</span> <a href="' + _settings.dataRes.relative_path + '/topic/' + _settings.dataRes.tid + '" class="see-topic" target="_blank">Voir le sujet sur le forum</a></span>';
}

function showLoadMore() {
  document.querySelector('#nodebb-load-more').style.display = 'block';
}

function hideLoadMore() {
  document.querySelector('#nodebb-load-more').style.display = 'none';
}

function addFooterText() {
  var text = document.querySelector(".load-more-text");
  text.innerHTML = '<span class="nodebb-copyright">Propulsé par <a href="' + _settings.dataRes.relative_path + '" class="comment-logo" target="_blank"><img src="' + _settings.dataRes.relative_path + '/plugins/nodebb-plugin-blog-comments-cryptofr/icons/cryptofr-comments.svg" alt="add emojis" class="icon"></a> <span class="hide-mobile">&bull;</span> <a href="' + _settings.dataRes.relative_path + '/topic/' + _settings.dataRes.tid + '" class="see-topic" target="_blank">Voir le sujet sur le forum</a></span>';
}
/**
 * Creates a snackbar inside the dom
 * @param {string} text text of the snackbar
 * @param {boolean} success whether the snackbar will show a success or error message, this affects the class used by the object
 */


window.createSnackbar = createSnackbar;

function createSnackbar(text, success) {
  var div = document.createElement("div");
  div.classList.add("snackbar");
  div.classList.add("show-snackbar");
  div.classList.add(success ? "success" : "error");
  div.innerText = text;
  document.querySelector("body").appendChild(div);
  setTimeout(function removeSnackbar() {
    (0, _util.removeNodes)(div);
  }, 3000);
}
/**
 * Function that reloads all comments within the DOM
 *
 * CHECK TO NOT RELOAD ALWAYS
 */


function reloadComments() {
  var pag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var currentPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var showLoader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (currentPage > pag) {
    // console.log("finish")
    _settings.set.reload(false);

    return null;
  }

  if (pag > 0) {
    $("body").addClass("loadmore");
  }

  _settings.set.page(currentPage);

  _settings.set.pagination(pag);

  _settings.set.postData([]);

  var paging = _settings.pagination;

  if (_settings.reload) {
    paging = _settings.page;
  }

  if (showLoader) (0, _util.addLoader)();

  if (!(0, _wordpress.checkIfWpAdmin)()) {
    _settings.set.commentsURL(nodeBBURL + "/comments/get/" + (window.blogger || "default") + "/" + articleID + "/" + paging + "/" + _settings.sorting);
  } else _settings.set.commentsURL(nodeBBURL + "/comments/getAll/" + (window.blogger || "default") + "/" + articleID);

  console.log(_settings.commentsURL);

  _settings.XHR.open("GET", _settings.commentsURL, true);

  _settings.XHR.withCredentials = true;

  _settings.XHR.send();
} // CHECK IF THERE IS NEW COMMENTS AND RELOAD DOM
// /!\ DON'T DO THAT /!\ >> DON'T RELOAD THE DOM EVERYTIME


function newCommentsCheck() {
  // if (document.hasFocus()){
  setInterval(function () {
    (0, _api.getNewerComments)(_settings.timestamp, _settings.dataRes.tid).then(function (res) {
      return res.json();
    }).then(function (res) {
      // pegar comentario para +1
      _settings.set.commentData(res.postsData);

      _settings.set.commentData(_settings.commentData.filter(function (p) {
        return !_settings.activeUserComments.find(function (z) {
          return z.pid === p.pid;
        });
      }));

      if (_settings.commentData.length > 0) {
        document.querySelector('.new-comments-counter').innerText = _settings.commentData.length;
        document.querySelector('.newer-comments').style.display = "block";
        document.querySelector('.newer-comments').setAttribute('data-timestamp', res.timestamp);
      }
    });
  }, 10000); // }
}

function newerCommentsEvents() {
  document.querySelector('.newer-comments').addEventListener('click', function () {
    var _iterator = _createForOfIteratorHelper(_settings.commentData),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var comment = _step.value;
        // console.log('comment',comment)
        var dataLevel = 0;
        var parentLi = null;
        var parentLevel = 0;

        if (comment.toPid) {
          var parentPid = comment.toPid;
          parentLi = document.querySelector('li[data-pid="' + parentPid + '"]');
          if (!parentLi) continue;
          parentLevel = Number(parentLi.querySelector('.topic-item').getAttribute('data-level'));

          if (parentLevel != 2) {
            dataLevel = parentLevel + 1;
          } else {
            dataLevel = 2;
          }
        }

        var commentTimeStamp = comment.timestamp;
        if (typeof comment.timestamp === 'number') commentTimeStamp = (0, _util.timeAgo)(comment.timestamp);
        var $li = document.createElement('li');
        $li.innerHTML = (0, _newComment.parseNewComment)(comment, comment.user, _settings.dataRes.token, comment.tid, dataLevel, commentTimeStamp);
        $li.setAttribute('data-pid', comment.pid);
        $li.querySelector('.topic-item').setAttribute('data-level', dataLevel);

        if (parentLevel == 2) {
          var grandParentLi = parentLi.parentNode.parentNode;
          var grandParentUl = grandParentLi.querySelector('ul');
          grandParentUl.prepend($li);
        } else if (parentLi && parentLi.querySelector('ul')) {
          parentLi.querySelector('ul').prepend($li);
        } else if (parentLi && !parentLi.querySelector('ul')) {
          var parentUl = document.createElement('ul');
          parentUl.append($li);
          parentLi.append(parentUl);
          parentLi.classList.add('expandable');
          parentLi.classList.add('expanded');
        } else if (!parentLi) {
          document.querySelector('#nodebb-comments-list').prepend($li);
        }

        $li.querySelector('.post-body').setAttribute('content', $li.querySelector('.post-body').innerHTML);
        (0, _drawComments.bindEvents)(comment.user, $li);
        (0, _drawComments.addBadges)($li, comment);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    _settings.set.timestamp(this.getAttribute('data-timestamp'));

    setMaxHeight(document.getElementById('nodebb-comments-list'));
    document.querySelector('.newer-comments').style.display = "none";
  });
}
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
} // FUNCTION FOR COMMENT SUBMISSION


function commentSubmissionsHandler(form) {
  if (form.getAttribute('data-event')) return;
  form.setAttribute('data-event', 'true'); // console.log(form)

  form.addEventListener('submit', function (event) {
    form.querySelector(".submit-comment").classList.add("loading-button");
    event.preventDefault();
    var inputs = {};

    var _iterator2 = _createForOfIteratorHelper(form.querySelectorAll("input")),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var input = _step2.value;
        inputs[input.getAttribute("name")] = input.getAttribute("value");
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var _iterator3 = _createForOfIteratorHelper(form.querySelectorAll("textarea")),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _input = _step3.value;
        inputs.content = _input.value; // inputs.content=form.querySelector('.emoji-wysiwyg-editor').innerHTML;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    inputs.content = inputs.content.replace(/<br>|&lt;br&gt;/ig, '\n').replace(/(<([^>]+)>)/ig, "");
    console.log('inputs', inputs); // ERROR: Comment too short

    if (inputs["content"].length < 8) {
      formSubmitError("Message too short", form);
      form.querySelector(".submit-comment").classList.remove("loading-button");
    } // ERROR: Comment Too Long
    else if (inputs["content"].length > 30000) {
        formSubmitError("Message too Long", form);
        form.querySelector(".submit-comment").classList.remove("loading-button");
      } // OK! Sending Reply or Edit POST
      else {
          var newLi = null;
          (0, _api.newFetch)(form.getAttribute("action"), inputs).then(function (res) {
            return res.json();
          }).then(function (res) {
            form.querySelector('button').classList.remove('loading-button');

            if (/edit/.test(form.getAttribute('action'))) {
              editActionHandler(form, inputs);
              form.classList.add('hidden');
              $('.editing').removeClass('hidden').removeClass('editing');
            } else if (form.classList.contains('top-post-form')) {
              newLi = topReplyHandler(form, res);
            } else if (/reply/.test(form.getAttribute('action'))) {
              form.classList.add('hidden');
              newLi = innerReplyHandler(form, res);
            }

            if (newLi) {
              (0, _drawComments.bindEvents)(res.user, newLi);
              (0, _drawComments.addBadges)(newLi, res);

              _settings.set.activeUserComments(res);
            }

            $(newLi).find('.post-body img').each(function () {
              this.onload = function () {
                setMaxHeight(document.getElementById('nodebb-comments-list'));
              };
            });
          });
        }

    return false;
  });
}

function editActionHandler(form, inputs) {
  var $postBody = form.closest('div').querySelector('.post-body');
  var content = inputs.content;
  $postBody.innerHTML = content;
  $postBody.setAttribute('content', content);
  $postBody.innerHTML = (0, _util.parseCommentQuotes)($postBody.innerHTML);
  (0, _gifs.singleGifComment)($postBody);
  form.classList.add('hidden');
  form.querySelector(".submit-comment").classList.remove("loading-button");
}

function topReplyHandler(form, res) {
  var $li = document.createElement('li');
  $li.innerHTML = (0, _newComment.parseNewComment)(res, res.user, _settings.dataRes.token, res.tid);
  $li.querySelector('.post-body').setAttribute('content', $li.querySelector('.post-body').innerHTML);
  $li.setAttribute('data-pid', res.pid);
  $li.querySelector('.post-body').innerHTML = (0, _util.parseCommentQuotes)($li.querySelector('.post-body').innerHTML);
  $li.querySelector('.post-body').innerHTML = $li.querySelector('.post-body').innerHTML.replace(/\n/gim, '<br>');
  var nodebbDiv = document.getElementById("nodebb-comments-list");
  nodebbDiv.prepend($li);
  form.querySelector('textarea').value = '';
  form.querySelector('.emoji-wysiwyg-editor').innerHTML = '';
  return $li;
}

function parentCommentSetToDefault($li) {
  $li.classList.add('expandable');
  $li.classList.add('expanded');
  var $topicItem = $li.querySelector('.topic-item');
  $topicItem.classList.remove('replying');
  $topicItem.classList.remove('quoting'); // Hide and clear forms 

  var _iterator4 = _createForOfIteratorHelper($li.querySelector('.topic-item').querySelectorAll('form')),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var f = _step4.value;
      f.classList.add('hidden');
      f.querySelector('textarea').value = '';
      f.querySelector('.emoji-wysiwyg-editor').innerHTML = '';
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
}

function innerReplyHandler(form, res) {
  var $oldLi = form.closest('li');
  parentCommentSetToDefault($oldLi);
  var dataLevel = $oldLi.querySelector('.topic-item').getAttribute('data-level');
  var $li = document.createElement('li');
  $li.innerHTML = (0, _newComment.parseNewComment)(res, res.user, _settings.dataRes.token, res.tid, dataLevel);
  $li.querySelector('.post-body').setAttribute('content', $li.querySelector('.post-body').innerHTML);
  $li.setAttribute('data-pid', res.pid);
  $li.querySelector('.post-body').innerHTML = (0, _util.parseCommentQuotes)($li.querySelector('.post-body').innerHTML);
  $li.querySelector('.post-body').innerHTML = $li.querySelector('.post-body').innerHTML.replace(/\n/gim, '<br>');
  (0, _gifs.singleGifComment)($li.querySelector('.post-body'));
  var parentUl = null; // Setting Parent ul to append the new li 

  if (dataLevel >= '2') {
    $li.querySelector('.topic-item').setAttribute('data-level', 2);
    parentUl = $oldLi.parentNode.parentNode.querySelector('ul');
    $oldLi.classList.remove('expandable');
    $oldLi.classList.remove('expanded');
  } else {
    $li.querySelector('.topic-item').setAttribute('data-level', Number(dataLevel) + 1);
    parentUl = $oldLi.querySelector('ul');
  }

  if (!parentUl) {
    var newUL = document.createElement('ul');
    $oldLi.append(newUL);
    parentUl = newUL;
  }

  parentUl.prepend($li);
  return $li;
}

function formSubmitError(message, form) {
  form.querySelector(".nodebb-error").innerText = message;
  setTimeout(function () {
    form.querySelector(".nodebb-error").innerText = "";
  }, 3000);
}

function setMaxHeight(comments) {
  var _iterator5 = _createForOfIteratorHelper(comments.querySelectorAll('ul')),
      _step5;

  try {
    var _loop = function _loop() {
      var ul = _step5.value;
      ul.style.maxHeight = 'initial';
      setTimeout(function () {
        ul.style.maxHeight = getComputedStyle(ul)['height'];
      }, 1000);
    };

    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
}

window.setMaxHeight = setMaxHeight;
},{"../../settings.js":"LXja","../util.js":"VGLh","../api.js":"gYYA","../../integration/wordpress.js":"poQx","../addons/gifs.js":"XBBC","./expandComments.js":"PCfX","./newComment.js":"OGtT","./drawComments.js":"xsmJ"}],"kjEe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareModal = prepareModal;
exports.onSubmitSignUp = onSubmitSignUp;
exports.onSubmitLogin = onSubmitLogin;
exports.closeModal = closeModal;
exports.tabIsActive = tabIsActive;
exports.authenticate = authenticate;
exports.grecaptchaGrab = grecaptchaGrab;
exports.loginError = loginError;

var _settings = require("../../settings.js");

var _loadComments = require("../comments/loadComments.js");

var _api = require("../api.js");

/**
 * Function called to set up values on the modal
 * @param {string} modalTemplate HTML code for the modal
 * @param {string} token CSRF token
 * @param {function} onSubmit function to be called when a submit event occurs
 * @returns {DOMElement} Modal's div element
 */
function prepareModal(modalTemplate, token, onSubmit) {
  var div = document.createElement("div");
  div.innerHTML = modalTemplate;
  div.querySelector("span.modal-close").onclick = closeModal;
  var form = div.querySelector("form");
  form.onsubmit = onSubmit;
  form.setAttribute("action", nodeBBURL + "/login");
  form.querySelector("input[name='_csrf']").setAttribute("value", token);
  var registerModal$ = div.querySelector(".register-modal-open");

  if (registerModal$) {
    registerModal$.setAttribute("href", nodeBBURL + "/register");
  }

  if (div.querySelector(".google a")) div.querySelector(".google a").setAttribute("data-link", nodeBBURL + "/auth/google");
  if (div.querySelector(".facebook a")) div.querySelector(".facebook a").setAttribute("data-link", nodeBBURL + "/auth/facebook");
  if (div.querySelector(".twitter a")) div.querySelector(".twitter a").setAttribute("data-link", nodeBBURL + "/auth/twitter");
  if (div.querySelector(".github a")) div.querySelector(".github a").setAttribute("data-link", nodeBBURL + "/auth/github");
  if (div.querySelector("img.icon")) div.querySelector("img.icon").setAttribute("src", nodeBBURL + "/plugins/nodebb-plugin-blog-comments-cryptofr/icons/cryptofr-comments.svg");
  return div;
}
/**
 * Function called when the sign up form is submitted
 * @param {HTMLInputElement} e event information
 */


function onSubmitSignUp(e) {
  e.preventDefault();
  var t = e.target;
  var username = t.querySelector("input[name='username']").value;
  var email = t.querySelector("input[name='email']").value;
  var password = t.querySelector("input[name='password']").value;
  var passwordConfirm = t.querySelector("input[name='password-confirm']").value;
  var checkedTerms = t.querySelector("input[name='terms']").checked;
  var token = t.querySelector("input[name='_csrf']").value;
  (0, _api.signUp)(username, email, password, passwordConfirm, token, checkedTerms);
  setTimeout(closeModal, 500);
}
/**
 * Function called when the login form is submitted
 * @param {HTMLInputElement} e event information
 */


function onSubmitLogin(e) {
  e.preventDefault();
  var t = e.target;
  var modalElement = document.querySelector("div.modal[data-closed='0']");
  var loginButton = document.querySelectorAll('button.login-button')[0];
  loginButton.classList.add("loading-button");
  (0, _api.login)(t.querySelector("input[name='email']").value, t.querySelector("input[name='password']").value, t.querySelector("input[name='_csrf']").value); // setTimeout(closeModal, 100);
}
/**
 * Closes whatever modal is opened within the plugin
 */
// /!\ MOdals closing weirdly /!\


function closeModal() {
  var modalElement = document.querySelector("div.modal[data-closed='0']");

  if (modalElement) {
    modalElement.setAttribute("data-closed", "1");
    modalElement.style.display = "none"; // set.reload(true) 

    (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
  }
}

function tabIsActive() {
  window.onfocus = closeModal;
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
  // set.savedText(contentDiv.value);
  var modal = openModal(type);
  var timer = setInterval(function () {
    if (modal.getAttribute("data-closed") === "1") {
      clearInterval(timer); // reloadComments();
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
} // Google Captcha


function grecaptchaGrab() {
  if (window.grecaptcha && typeof window.grecaptcha.ready === "function") {
    window.grecaptcha.ready(function () {
      var interval = setInterval(renderCallback, 1000);

      function renderCallback() {
        var container = document.getElementById("google-callback");

        if (container && !container.querySelector("iframe")) {
          $("#google-callback").click(function (e) {
            return e.preventDefault();
          });

          _settings.set.renderedCaptcha(window.grecaptcha.render(container, {
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
} // Login error handle


function loginError(message) {
  var modal = document.querySelector("#login-modal");
  modal.querySelector(".nodebb-error").innerText = message;
  modal.querySelector(".nodebb-error").classList.add("display");
  setTimeout(function () {
    modal.querySelector(".nodebb-error").innerText = "";
    modal.querySelector(".nodebb-error").classList.remove("display");
  }, 6000);
}
},{"../../settings.js":"LXja","../comments/loadComments.js":"V8ra","../api.js":"gYYA"}],"sutU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onloadXHR = onloadXHR;
exports.onLoadFunction = onLoadFunction;

var _settings = require("../settings.js");

var _util = require("./util.js");

var _modal = require("./login/modal.js");

var _social = require("./login/social.js");

var _form = require("./login/form.js");

var _loadComments = require("./comments/loadComments.js");

var _sortComments = require("./comments/sortComments.js");

var _api = require("./api.js");

var _drawComments = require("./comments/drawComments.js");

function onloadXHR() {
  /**
   * onload handler for the authXHR variable. It creates a toast
   * with a message of login success or failed within it
   */
  _settings.authXHR.onload = function () {
    if (_settings.authXHR.status === 200) {
      (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
      setTimeout(function () {
        (0, _util.removeLoader)();
        (0, _loadComments.createSnackbar)("Login success", true);
      }, 1500);
    } else {
      (0, _util.removeLoader)();
      (0, _loadComments.createSnackbar)("Login failed", false);
    }
  };
  /**
   * Callback that is fired when a signup is processed
   */


  _settings.signUpXHR.onload = function signUpXHROnload() {
    function onRegisterFailed() {
      (0, _util.removeLoader)();
      (0, _loadComments.createSnackbar)("Register failed", false);
    }

    if (_settings.signUpXHR.status === 200) {
      var response = JSON.parse(_settings.signUpXHR.responseText);

      if (!response.error) {
        (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
        setTimeout(function () {
          (0, _util.removeLoader)();
          (0, _loadComments.createSnackbar)("Merci de confirmer votre inscription via le lien envoyé à votre email", true);
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


  _settings.XHR.onload = _drawComments.drawComments;
}
/**
* Creates an auxiliary function that's used for some XHR request objects as onload callback
* @param {XMLHttpRequest} xhr request object
* @returns {Function} onload handler
*/


function onLoadFunction(xhr) {
  setTimeout(function () {
    return function onLoadImpl() {
      xhr.isBusy = false;
      console.log("reloading because aja");
      (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
    };
  }, 500);
}
},{"../settings.js":"LXja","./util.js":"VGLh","./login/modal.js":"kjEe","./login/social.js":"Ca7Q","./login/form.js":"QP4Q","./comments/loadComments.js":"V8ra","./comments/sortComments.js":"JONd","./api.js":"gYYA","./comments/drawComments.js":"xsmJ"}],"ZSQl":[function(require,module,exports) {
"use strict";

var _settings = require("./settings.js");

var _onload = require("./general/onload.js");

var _api = require("./general/api.js");

var _util = require("./general/util.js");

var _modal = require("./general/login/modal.js");

var _loadComments = require("./general/comments/loadComments.js");

_settings.set.articlePath(window.location.protocol + "//" + window.location.host + window.location.pathname);

_settings.set.pluginURL(nodeBBURL + "/plugins/nodebb-plugin-blog-comments-cryptofr");

(0, _util.loadCSS)(_settings.pluginURL + "/css/comments.css");
(0, _util.loadCSS)(_settings.pluginURL + "/css/cryptofr.css");
(0, _util.loadCSS)(_settings.pluginURL + "/css/emoji.css");
(0, _util.loadCSS)(_settings.pluginURL + "/css/icons.css");
(0, _util.loadCSS)("https://fonts.googleapis.com/css?family=Roboto:100,300,400,700&display=swap");
(0, _util.loadCSS)("https://fonts.googleapis.com/css?family=Poppins:300,400,400i,500,600,700&display=swap");
document.getElementById("nodebb-comments").insertAdjacentHTML("beforebegin", '<div class="comments-area" id="nodebb"></div>');

_settings.set.nodebbDiv(document.getElementById("nodebb"));

(0, _util.loadScript)("https://www.google.com/recaptcha/api.js"); // loadScript(pluginURL + "/css/fontawesome/js/all.js"); 
// loadScript(pluginURL + "/js/config.js");
// loadScript(pluginURL + "/js/util.js");
// loadScript(pluginURL + "/js/jquery.emojiarea.js");
// loadScript(pluginURL + "/js/emoji-picker.js");
// loadScript(pluginURL + "/js/emoji-button-3.0.1.min.js");

setTimeout(_modal.grecaptchaGrab, 1000);

_settings.set.pagination(0);

_settings.set.reload(false);

_settings.set.reloading(0);

_settings.set.firstTime(true);

_settings.set.postData([]);

_settings.set.sorting("newest");

_settings.set.commentsURL(nodeBBURL + "/comments/get/" + (window.blogger || "default") + "/" + articleID + "/" + _settings.pagination + "/" + _settings.sorting);

var XHRaux = (0, _api.newXHR)();
XHRaux.onload = (0, _onload.onLoadFunction)(XHRaux);

_settings.set.XHR(XHRaux);

var voteXHRaux = (0, _api.newXHR)();
voteXHRaux.onload = (0, _onload.onLoadFunction)(voteXHRaux);

_settings.set.voteXHR(voteXHRaux);

var commentXHRaux = (0, _api.newXHR)();
commentXHRaux.onload = (0, _onload.onLoadFunction)(commentXHRaux);

_settings.set.commentXHR(commentXHRaux);

var authXHRaux = (0, _api.newXHR)();
authXHRaux.onerror = _util.removeLoader;

_settings.set.authXHR(authXHRaux);

var bookmarkXHRaux = (0, _api.newXHR)();
bookmarkXHRaux.onload = (0, _onload.onLoadFunction)(bookmarkXHRaux);

_settings.set.bookmarkXHR(bookmarkXHRaux);

var signUpXHRaux = (0, _api.newXHRFixed)();
signUpXHRaux.onerror = _util.removeLoader;

_settings.set.signUpXHR(signUpXHRaux);

(0, _loadComments.reloadComments)();

_settings.set.templates({
  blocks: {}
});

(0, _onload.onloadXHR)();
(0, _modal.tabIsActive)();
(0, _loadComments.newCommentsCheck)();
},{"./settings.js":"LXja","./general/onload.js":"sutU","./general/api.js":"gYYA","./general/util.js":"VGLh","./general/login/modal.js":"kjEe","./general/comments/loadComments.js":"V8ra"}]},{},["ZSQl"], null)