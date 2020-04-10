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
})({"epB2":[function(require,module,exports) {
var define;
function _typeof3(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof3 = function _typeof3(obj) { return typeof obj; }; } else { _typeof3 = function _typeof3(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof3(obj); }

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = function (modules, cache, entry, globalName) {
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
        } // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.


        if (previousRequire) {
          return previousRequire(name, true);
        } // Try the node require function if it exists.


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

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
    var mainExports = newRequire(entry[entry.length - 1]); // CommonJS

    if ((typeof exports === "undefined" ? "undefined" : _typeof3(exports)) === "object" && typeof module !== "undefined") {
      module.exports = mainExports; // RequireJS
    } else if (typeof define === "function" && define.amd) {
      define(function () {
        return mainExports;
      }); // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  } // Override the current require with this new one


  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
}({
  "epB2": [function (require, module, exports) {
    var define;

    function _typeof2(obj) {
      if (typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol") {
        _typeof2 = function _typeof2(obj) {
          return _typeof3(obj);
        };
      } else {
        _typeof2 = function _typeof2(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof3(obj);
        };
      }

      return _typeof2(obj);
    } // modules are defined as an array
    // [ module function, map of requires ]
    //
    // map of requires is short require name -> numeric require
    //
    // anything defined in a previous bundle is accessed via the
    // orig method which is the require for previous bundles


    parcelRequire = function (modules, cache, entry, globalName) {
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
            } // If there are other bundles on this page the require from the
            // previous one is saved to 'previousRequire'. Repeat this as
            // many times as there are bundles until the module is found or
            // we exhaust the require chain.


            if (previousRequire) {
              return previousRequire(name, true);
            } // Try the node require function if it exists.


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

        function localRequire(x) {
          return newRequire(localRequire.resolve(x));
        }

        function resolve(x) {
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
        var mainExports = newRequire(entry[entry.length - 1]); // CommonJS

        if ((typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === "object" && typeof module !== "undefined") {
          module.exports = mainExports; // RequireJS
        } else if (typeof define === "function" && define.amd) {
          define(function () {
            return mainExports;
          }); // <script>
        } else if (globalName) {
          this[globalName] = mainExports;
        }
      } // Override the current require with this new one


      parcelRequire = newRequire;

      if (error) {
        // throw error from earlier, _after updating parcelRequire_
        throw error;
      }

      return newRequire;
    }({
      "epB2": [function (require, module, exports) {
        var define;

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        } // modules are defined as an array
        // [ module function, map of requires ]
        //
        // map of requires is short require name -> numeric require
        //
        // anything defined in a previous bundle is accessed via the
        // orig method which is the require for previous bundles


        parcelRequire = function (modules, cache, entry, globalName) {
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
                } // If there are other bundles on this page the require from the
                // previous one is saved to 'previousRequire'. Repeat this as
                // many times as there are bundles until the module is found or
                // we exhaust the require chain.


                if (previousRequire) {
                  return previousRequire(name, true);
                } // Try the node require function if it exists.


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

            function localRequire(x) {
              return newRequire(localRequire.resolve(x));
            }

            function resolve(x) {
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
            var mainExports = newRequire(entry[entry.length - 1]); // CommonJS

            if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
              module.exports = mainExports; // RequireJS
            } else if (typeof define === "function" && define.amd) {
              define(function () {
                return mainExports;
              }); // <script>
            } else if (globalName) {
              this[globalName] = mainExports;
            }
          } // Override the current require with this new one


          parcelRequire = newRequire;

          if (error) {
            // throw error from earlier, _after updating parcelRequire_
            throw error;
          }

          return newRequire;
        }({
          "LXja": [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.set = exports.reload = exports.templates = exports.renderedCaptcha = exports.wholeTemplate = exports.postTemplate = exports.articlePath = exports.commentsCategory = exports.commentsAuthor = exports.commentsCounter = exports.commentsDiv = exports.contentDiv = exports.nodebbDiv = exports.savedText = exports.commentsURL = exports.XHR = exports.pagination = exports.postData = exports.sorting = exports.signUpXHR = exports.bookmarkXHR = exports.authXHR = exports.voteXHR = exports.pluginURL = exports.page = exports.reloading = exports.commentXHR = exports.dataRes = exports.gifCommentBox = exports.firstTime = void 0;
            var firstTime, gifCommentBox, dataRes, commentXHR, reloading, page, pluginURL, voteXHR, authXHR, bookmarkXHR, signUpXHR, sorting, postData, pagination, XHR, commentsURL, savedText, nodebbDiv, contentDiv, commentsDiv, commentsCounter, commentsAuthor, commentsCategory, articlePath, postTemplate, wholeTemplate, renderedCaptcha, templates, reload;
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
            exports.firstTime = firstTime;
            var set = {
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
              firstTime: firstTimeVal
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
          }, {}],
          "VGLh": [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.addTimeAgoRecursive = addTimeAgoRecursive;
            exports.timeAgo = timeAgo;
            exports.removeNodes = removeNodes;
            exports.addLoader = addLoader;
            exports.addLoaderInside = addLoaderInside;
            exports.removeLoader = removeLoader;
            exports.normalizePost = normalizePost;
            exports.loadCSS = loadCSS;
            exports.loadScript = loadScript;
            exports.loadScriptHead = loadScriptHead;
            exports.insertAfter = insertAfter;
            exports.changeAttribute = changeAttribute;
            exports.addClassHelper = addClassHelper;
            exports.windowOnload = windowOnload;
            exports.dispatchEmojis = dispatchEmojis;
            exports.reactElementRelocation = reactElementRelocation;
            exports.getIndexesOf = getIndexesOf;
            exports.parseCommentQuotes = parseCommentQuotes;
            exports.getCoords = getCoords;
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

            function removeNodes(nodes) {
              var nodeList = nodes && nodes.length !== undefined ? nodes : [nodes];
              var len = nodeList.length;
              if (nodes) for (var i = 0; i < len; i++) {
                var node = nodeList[i];
                node.parentNode.removeChild(node);
              }
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
              document.querySelector("#nodebb").appendChild(div);
              document.querySelector("body").classList.add("hasLoader");

              if (document.querySelector("html").scrollTop + document.querySelector("html").clientHeight / 2 >= getCoords(document.querySelector("#nodebb")).top + 350 && document.querySelector("html").scrollTop + document.querySelector("html").clientHeight / 2 <= getCoords(document.querySelector("#nodebb")).top + document.querySelector("#nodebb").offsetHeight - 50) {
                $(".loading").css("top", document.querySelector("html").scrollTop + document.querySelector("html").clientHeight / 2) - getCoords(document.querySelector("#nodebb")).top;
              } else if (document.querySelector("html").scrollTop + document.querySelector("html").clientHeight / 2 < getCoords(document.querySelector("#nodebb")).top + 350) {
                $(".loading").css("top", 350);
              } else {
                $(".loading").css("top", document.querySelector("#nodebb").offsetHeight + 50);
              }

              $(window).scroll(function () {
                if (document.querySelector("html").scrollTop + document.querySelector("html").clientHeight / 2 >= getCoords(document.querySelector("#nodebb")).top + 350 && document.querySelector("html").scrollTop + document.querySelector("html").clientHeight / 2 <= getCoords(document.querySelector("#nodebb")).top + document.querySelector("#nodebb").offsetHeight - 50) {
                  $(".loading").css("top", document.querySelector("html").scrollTop + document.querySelector("html").clientHeight / 2) - getCoords(document.querySelector("#nodebb")).top;
                } else if (document.querySelector("html").scrollTop + document.querySelector("html").clientHeight / 2 < getCoords(document.querySelector("#nodebb")).top + 350) {
                  $(".loading").css("top", 350);
                } else {
                  $(".loading").css("top", document.querySelector("#nodebb").offsetHeight + 50);
                }
              });
            }
            /**
             * Adds a loading div in the DOM
             */


            function addLoaderInside() {
              if (document.querySelector("div.loading")) {
                return;
              }

              var div = document.createElement("div");
              div.classList.add("loading-inside");
              document.querySelector("#nodebb").appendChild(div);
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

            function windowOnload() {
              loadScript(_settings.pluginURL + "/js/config.js");
              loadScript(_settings.pluginURL + "/js/util.js");
              loadScript(_settings.pluginURL + "/js/jquery.emojiarea.js");
              loadScript(_settings.pluginURL + "/js/emoji-picker.js");
            }

            function dispatchEmojis() {
              setTimeout(function () {
                var evt = new CustomEvent('dispatchEmojis', {});
                window.dispatchEvent(evt);
              }, 200);
            }

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
            }

            function parseCommentQuotes(comment) {
              var quotesChar = getIndexesOf("&gt; ", comment);

              for (var i = 1; i < quotesChar.length; i++) {
                var index = getIndexesOf("&gt; ", comment)[i];
                comment = comment.substring(0, index) + "</br>" + comment.substring(index, comment.length);
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
            }
          }, {
            "../settings.js": "LXja"
          }],
          "gYYA": [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.newXHR = newXHR;
            exports.newXHRFixed = newXHRFixed;
            exports.xget = xget;
            exports.xpost = xpost;
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

            function newFetch(path, data) {
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
                  (0, _modal.loginError)("Username and Password combination is incorrect");
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

              return newFetch(_settings.voteXHR, nodeBBURL + "/comments/delete/" + pid);
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
          }, {
            "../settings.js": "LXja",
            "./util.js": "VGLh",
            "./login/modal.js": "kjEe",
            "./comments/loadComments.js": "V8ra"
          }],
          "Ca7Q": [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.addSocialAuthListeners = addSocialAuthListeners;

            var _loadComments = require("../comments/loadComments.js");

            var _modal = require("./modal.js");
            /**
             * Function that adds social auth link listeners
             * @param {DOMElement} modal modal element
             */


            function addSocialAuthListeners(modal) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = modal.querySelectorAll("a[data-link]")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            }
          }, {
            "../comments/loadComments.js": "V8ra",
            "./modal.js": "kjEe"
          }],
          "QP4Q": [function (require, module, exports) {
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
          }, {}],
          "JONd": [function (require, module, exports) {
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
          }, {
            "../../settings.js": "LXja",
            "./loadComments.js": "V8ra"
          }],
          "PCfX": [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.checkExpandableComments = checkExpandableComments;

            function checkExpandableComments() {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = document.querySelectorAll("#nodebb-comments-list li")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var comment = _step.value;

                  if (comment.querySelector("ul")) {
                    var expandableButton = document.createElement("span");
                    expandableButton.classList.add("expandable-button");
                    expandableButton.classList.add("expanded");
                    comment.classList.add("expandable");
                    comment.classList.add("expanded");
                    comment.querySelector(".topic-item > .topic-body > .topic-text > .post-content >small ").appendChild(expandableButton);
                  }
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              collapseExpandCommentEvent();
            }

            function collapseExpandCommentEvent() {
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                var _loop = function _loop() {
                  var expandableButton = _step2.value;
                  expandableButton.addEventListener('click', function (e) {
                    if (expandableButton.classList.contains('expanded')) {
                      var expandedButton = expandableButton;
                      expandedButton.classList.remove("expanded");
                      expandedButton.classList.add("collapsed");
                      var expandedComment = expandedButton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                      expandedComment.classList.remove("expanded");
                      expandedComment.classList.add("collapsed");
                      expandedComment.querySelector("ul:first-of-type").classList.add("collapsed-comments");
                    } else {
                      var collapsedButton = expandableButton;
                      collapsedButton.classList.remove("collapsed");
                      collapsedButton.classList.add("expanded");
                      var collapsedComment = collapsedButton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                      collapsedComment.classList.remove("collapsed");
                      collapsedComment.classList.add("expanded");
                      collapsedComment.querySelector("ul:first-of-type").classList.remove("collapsed-comments");
                    }
                  });
                };

                for (var _iterator2 = document.querySelectorAll("#nodebb-comments-list li.expandable .expandable-button")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _loop();
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            }
          }, {}],
          "XBBC": [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.gifBoxInit = gifBoxInit;
            exports.gifContentCheck = gifContentCheck;
            exports.closeGifBox = closeGifBox;

            var _settings = require("../../settings.js"); // url Async requesting function


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

              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = document.querySelectorAll("#gifs-list img")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var img = _step.value;
                  img.parentNode.removeChild(img);
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              document.querySelector("#gifs-list").innerHTML = "";
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

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

                for (var _iterator2 = response_objects["results"][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var element;

                  _loop();
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }

              return;
            } // function to call the trending and category endpoints


            function grab_data(search_term) {
              // set the apikey and limit
              var apikey = "D68S16GQGKWB";
              var lmt = 20; // using default locale of en_US

              var search_url = "https://api.tenor.com/v1/search?tag=" + search_term + "&key=" + apikey + "&limit=" + lmt;
              httpGetAsync(search_url, tenorCallback_search); // data will be loaded by each call's callback

              return;
            }

            function gifBoxInit() {
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                var _loop2 = function _loop2() {
                  var gifButton = _step3.value;
                  gifButton.addEventListener('click', function (event) {
                    document.querySelector(".gifs-box").style.display = "block";

                    _settings.set.gifCommentBox(gifButton.parentNode.parentNode.parentNode.parentNode.querySelector("textarea"));
                  });
                };

                for (var _iterator3 = document.querySelectorAll('.special-action.gif .icon')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  _loop2();
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }

              document.querySelector(".gif-search").addEventListener("keyup", function (event) {
                grab_data(document.querySelector(".gif-search").value);
              });
              var closeGifBoxIcon = document.querySelector('.close-gif'); //I'm using "click" but it works with any event

              document.addEventListener('click', function (event) {
                var isClickInside = closeGifBoxIcon.contains(event.target);

                if (isClickInside) {
                  closeGifBox();
                }
              });
            }

            function gifContentCheck() {
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                for (var _iterator4 = document.querySelectorAll(".post-body")[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
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
                _didIteratorError4 = true;
                _iteratorError4 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                    _iterator4.return();
                  }
                } finally {
                  if (_didIteratorError4) {
                    throw _iteratorError4;
                  }
                }
              }
            }

            function closeGifBox() {
              document.querySelector(".gifs-box").style.display = "none";
              document.querySelector(".gifs-box input").value = "";
              var event = document.createEvent('HTMLEvents');
              event.initEvent('keyup', true, false);
              document.querySelector(".gifs-box input").dispatchEvent(event);
            }
          }, {
            "../../settings.js": "LXja"
          }],
          "w7Fc": [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.uploadInit = uploadInit;

            function generateUUID() {
              return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0;
                var v = c === 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
              });
            }

            function uploadInit() {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = document.querySelectorAll(".special-action.img")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var icon = _step.value;
                  icon.addEventListener('click', function (event) {
                    $("#formupload #file").attr("focused", "1");
                    $("#formupload #file").trigger("click");
                  });
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              $("#formupload #file").on("change", function (e) {
                e.preventDefault();
                var formData = new FormData(document.getElementById("formupload")); // formData.append(f.attr("name"), $(this)[0].files[0]);

                console.log("before");
                console.log(formData);
              });
            }
          }, {}],
          "xsmJ": [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.drawComments = drawComments;
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

            var _upload = require("../addons/upload.js");

            var _util2 = require("../util.js"); // import $ from 'jquery';
            // window.drawComments = drawComments


            function drawComments() {
              (0, _util.removeLoader)();

              if (_settings.XHR.status >= 200 && _settings.XHR.status < 400) {
                var data = JSON.parse(_settings.XHR.responseText),
                    html;
                (0, _sortComments.setActiveSortingLi)(_settings.sorting, data.sorting);

                _settings.set.commentsDiv(document.getElementById("nodebb-comments-list"));

                _settings.set.commentsCounter(document.getElementById("nodebb-comments-count"));

                _settings.set.commentsAuthor(document.getElementById("nodebb-comments-author"));

                _settings.set.commentsCategory(document.getElementById("nodebb-comments-category"));

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

                _settings.set.dataRes(data); // console.log(data)


                if (_settings.firstTime && data.isValid) {
                  (0, _loadComments.addButtons)();

                  _settings.set.firstTime(false);
                }

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
                }

                html = parse(data, data.template);
                console.log(data);
                _settings.nodebbDiv.innerHTML = (0, _util.normalizePost)(html); // nodebbDiv.insertAdjacentHTML('beforeend', normalizePost(html));

                (0, _sortComments.setActiveSortingLi)(_settings.sorting);

                var nodebbCommentsList = _settings.nodebbDiv.querySelector("#nodebb-comments-list");

                var selectors = ['[data-component="post/reply"]', '[data-component="post/quote"]', '[data-component="post/bookmark"]', '[data-component="post/upvote"]', '[data-component="post/downvote"]', '[data-component="post/edit"]', '[data-component="post/delete"]'].join(",");
                (0, _util.bindOnClick)(_settings.nodebbDiv.querySelectorAll(selectors), function (event) {
                  if (!data.user || !data.user.uid) {
                    (0, _modal.authenticate)("login");
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
                    var formClass = /\/edit$/.test(dataComponent) ? ".sub-edit-input" : ".sub-reply-input";
                    var elementForm = topicItem.querySelector("form" + formClass);
                    var formInput = elementForm.querySelector("textarea");
                    var visibleForm = nodebbCommentsList.querySelector("li .topic-item form:not(.hidden)" + ":not(" + formClass + ")");

                    if (visibleForm && visibleForm !== elementForm) {
                      visibleForm.classList.add("hidden");
                    }

                    var postBody;

                    if (/\/(quote|edit)$/.test(dataComponent)) {
                      postBody = topicItem.querySelector(".post-content .post-body");
                    }

                    if (/\/quote$/.test(dataComponent)) {
                      var quote = (postBody.getAttribute('content') ? postBody.getAttribute('content') : postBody.textContent).split("\n").map(function (line) {
                        return line ? "> " + line : line;
                      }).join("\n");
                      formInput.value = "@" + topicItem.getAttribute("data-userslug") + " said:\n" + quote + formInput.value;
                      elementForm.classList.remove("hidden");
                      elementForm.querySelector(".emoji-wysiwyg-editor").innerHTML = quote;
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
                          elementForm.querySelector(".emoji-wysiwyg-editor").innerHTML = atStr + " " + formInput.value;
                        }
                      } else {
                        formInput.value = "";
                      }

                      elementForm.classList.remove("hidden");
                    } else if (/\/edit$/.test(dataComponent)) {
                      formInput.value = postBody.getAttribute('content');
                      elementForm.classList.remove("hidden");
                    } else if (/\/upvote$/.test(dataComponent)) {
                      if (data.user.uid != uid) {
                        (0, _api.upvotePost)(topicItem, pid, upvoted).then(function () {
                          _settings.set.reload(true);

                          (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
                        }).catch(console.log);
                      }
                    } else if (/\/downvote$/.test(dataComponent)) {
                      if (data.user.uid != uid) {
                        (0, _api.downvotePost)(topicItem, pid, downvoted).then(function () {
                          _settings.set.reload(true);

                          (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
                        }).catch(console.log);
                      }
                    } else if (/\/bookmark$/.test(dataComponent)) {
                      bookmarkPost(topicItem, pid, bookmarked).then(function () {
                        _settings.set.reload(true);

                        (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
                      }).catch(console.log);
                    } else if (/\/delete/.test(dataComponent)) {
                      (0, _api.deletePost)(topicItem, pid).then(function () {
                        _settings.set.reload(true);

                        (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
                      });
                    }
                  } else {
                    if (/\/upvote$/.test(dataComponent)) {
                      if (data.user.uid != mainPost.uid) {
                        (0, _api.upvotePost)(_settings.nodebbDiv.querySelector(".top-tool-box"), mainPost.pid, upvoted).then(function () {
                          (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
                        }).catch(console.log);
                      }
                    } else if (/\/bookmark$/.test(dataComponent)) {
                      bookmarkPost(_settings.nodebbDiv.querySelector(".top-tool-box"), mainPost.pid, bookmarked).then(function () {
                        _settings.set.reload(true);

                        (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
                      }).catch(console.log);
                    } else if (/\/downvote$/.test(dataComponent)) {
                      (0, _api.downvotePost)(_settings.nodebbDiv.querySelector(".top-tool-box"), mainPost.pid, downvoted).then(function () {
                        _settings.set.reload(true);

                        (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
                      }).catch(console.log);
                    } else if (/\/delete/.test(dataComponent)) {
                      (0, _api.deletePost)(topicItem, pid).then(function () {
                        _settings.set.reload(true);

                        (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
                      });
                    }
                  }
                });

                _settings.nodebbDiv.querySelector("a[data-component='sort/best']").addEventListener("click", function () {
                  return (0, _sortComments.setSorting)("best");
                });

                _settings.nodebbDiv.querySelector("a[data-component='sort/newest']").addEventListener("click", function () {
                  return (0, _sortComments.setSorting)("newest");
                });

                _settings.nodebbDiv.querySelector("a[data-component='sort/oldest']").addEventListener("click", function () {
                  return (0, _sortComments.setSorting)("oldest");
                });

                _settings.set.contentDiv(document.getElementById("nodebb-content"));

                if (_settings.savedText) {
                  _settings.contentDiv.value = _settings.savedText;
                }

                if (data.tid) {
                  var loadMore = document.getElementById("nodebb-load-more");

                  if (data.posts.length) {
                    loadMore.style.display = "inline-block";
                  }

                  if (_settings.pagination * 10 + data.posts.length + 1 >= data.postCount) {
                    loadMore.style.display = "none";
                  }

                  if (typeof jQuery !== "undefined" && jQuery() && jQuery().fitVids) {
                    jQuery(_settings.nodebbDiv).fitVids();
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
                    document.getElementById("nodebb-login").onclick = function () {
                      (0, _modal.authenticate)("login");
                    };
                  }
                } else {
                  if (data.isAdmin) {
                    var adminXHR = newXHR(); //adminXHR.open('GET', wordpressURL + '?json=get_post&post_type='+articleType+'&post_id=' + articleID);
                    // TODO Get articles too, not only post types

                    adminXHR.open("GET", wordpressURL + "/wp-json/wp/v2/posts/" + articleID);

                    adminXHR.onload = function () {
                      if (adminXHR.status >= 200 && adminXHR.status < 400) {
                        // We need tags
                        var articleData = JSON.parse(adminXHR.responseText.toString()),
                            translator = document.createElement("span"),
                            tags = articleData.tags;
                        translator.innerHTML = articleData.excerpt ? articleData.excerpt.rendered : "";
                        var markdown = translator.firstChild.innerHTML + "\n\n**Click [here](" + _settings.articlePath + ") to see the full blog post**";
                        document.getElementById("nodebb-content-markdown").value = markdown;
                        document.getElementById("nodebb-content-title").value = articleData.title.rendered;
                        document.getElementById("nodebb-content-cid").value = categoryID || -1;
                        document.getElementById("nodebb-content-tags").value = JSON.stringify(tags);
                        document.getElementById("nodebb-content-blogger").value = data.blogger || "default";
                      } else {
                        console.warn("Unable to access API. Please install the JSON API plugin located at: http://wordpress.org/plugins/json-api");
                      }
                    };

                    adminXHR.send();
                  }
                }
              }

              (0, _util.reactElementRelocation)();
              (0, _gifs.gifContentCheck)();
              checkImgProfile();

              if (_settings.pagination == 0 && !_settings.reload) {
                $("#nodebb-comments-list").css('min-height', 0);
              } else {
                $("#nodebb-comments-list").css('min-height', $("#nodebb-comments-list").height());
              }

              $("body").removeClass("loadmore");

              if (_settings.reload) {
                (0, _loadComments.reloadComments)(_settings.pagination, _settings.page + 1, false);
              }

              (0, _loadComments.commentSubmissionsHandler)();
              (0, _expandComments.checkExpandableComments)();
              commentOptions();
              (0, _util.dispatchEmojis)();
              (0, _gifs.gifBoxInit)();
              prepareSignout(data.token); // onLoadFunction();
              // uploadInit();
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
                  if (_settings.reloading) loadedComments = checkNewComments(existingComments, loadedComments); // console.log(div)

                  if (div.querySelector("#nodebb-comments-list")) {
                    if (_settings.pagination == 0 || _settings.page == 0 && _settings.reload) {
                      div.querySelector("#nodebb-comments-list").innerHTML = loadedComments.innerHTML;
                    } else {
                      div.querySelector("#nodebb-comments-list").innerHTML = document.querySelector("#nodebb-comments-list").innerHTML;
                      div.querySelector("#nodebb-comments-list").insertAdjacentHTML('beforeend', loadedComments.innerHTML);
                    }
                  }

                  template = div.innerHTML;
                }

                return template;
              }(data, "", template);
            }

            function checkNewComments(existingComments, loadedComments) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = loadedComments.querySelectorAll("li")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var comment = _step.value;
                  var flag = false;
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = existingComments.querySelectorAll("li")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var oldcomment = _step2.value;
                      if (comment.getAttribute("data-pid") == oldcomment.getAttribute("data-pid") && !oldcomment.classList.contains('new-comment')) flag = true;
                    }
                  } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                      }
                    } finally {
                      if (_didIteratorError2) {
                        throw _iteratorError2;
                      }
                    }
                  }

                  if (!flag) comment.classList.add("new-comment");
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
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
                clone.querySelector("button[data-reply-button]").innerText = "Répondre à " + comment.user.username;
                (0, _util.addClassHelper)(clone.querySelector("i.i-upvote"), comment.upvoted, "icon-thumbs-up-alt", "icon-thumbs-up");
                (0, _util.addClassHelper)(clone.querySelector("i.i-bookmark"), comment.bookmarked, "icon-bookmark", "icon-bookmark-empty");
                (0, _util.addClassHelper)(clone.querySelector("i.i-downvote"), comment.downvoted, "icon-thumbs-down-alt", "icon-thumbs-down");
                clone.querySelector("div.post-body").setAttribute("content", comment.content);
                clone.querySelector("div.post-body").innerHTML = comment.content;
                clone.querySelector("div.post-body").innerHTML = (0, _util2.parseCommentQuotes)(clone.querySelector("div.post-body").innerHTML);
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

                clone.querySelector("a.username").setAttribute('href', relativePath + "/user/" + comment.user.userslug);
                clone.querySelector("span[data-strong-username]").innerText = comment.user.username;

                if (comment.parent && comment.parent.username) {
                  clone.querySelector("span[data-parent-username]").innerText = "@" + comment.parent.username; // We update here because in another method timestamps are updated for parent comments

                  if (typeof comment.timestamp === "number") {
                    comment.timestamp = (0, _util.timeAgo)(parseInt(comment.timestamp, 10));
                  }
                } else {
                  (0, _util.removeNodes)(clone.querySelector("button.reply-label"));
                }

                if (comment.uid !== uid) {
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
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                var _loop = function _loop() {
                  var comment = _step3.value;

                  if (comment.querySelector(".options-container .edit-option")) {
                    // EDIT BUTTON
                    comment.querySelector(".options-container .edit-option").addEventListener("click", function () {
                      comment.parentNode.querySelector(".sub-edit-input").classList.remove("hidden");
                      comment.parentNode.querySelector(".sub-edit-input textarea").value = comment.parentNode.querySelector(".post-body").getAttribute("content");
                      comment.parentNode.querySelector(".sub-edit-input .emoji-wysiwyg-editor").innerText = comment.parentNode.querySelector(".post-body").getAttribute("content");
                    }); // DELETE BUTTON

                    comment.querySelector(".options-container .delete-option").addEventListener("click", function () {
                      (0, _api.deletePost)(comment.parentNode, comment.parentNode.getAttribute("data-pid"));
                      (0, _loadComments.reloadComments)(_settings.pagination, 0, false);
                    });
                  }

                  var _iteratorNormalCompletion4 = true;
                  var _didIteratorError4 = false;
                  var _iteratorError4 = undefined;

                  try {
                    for (var _iterator4 = comment.querySelectorAll(".menuButton")[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                      var button = _step4.value;
                      button.addEventListener("click", function () {
                        comment.querySelector(".options-container").style.display = "block";
                      });
                    }
                  } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                        _iterator4.return();
                      }
                    } finally {
                      if (_didIteratorError4) {
                        throw _iteratorError4;
                      }
                    }
                  }
                };

                for (var _iterator3 = document.querySelectorAll("#nodebb-comments-list .topic-body")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  _loop();
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }
            }
          }, {
            "../../settings.js": "LXja",
            "./../util.js": "VGLh",
            "../login/modal.js": "kjEe",
            "../login/social.js": "Ca7Q",
            "../login/form.js": "QP4Q",
            "./loadComments.js": "V8ra",
            "./sortComments.js": "JONd",
            "../api.js": "gYYA",
            "./expandComments.js": "PCfX",
            "../onload.js": "sutU",
            "../addons/gifs.js": "XBBC",
            "../addons/upload.js": "w7Fc",
            "../util.js": "VGLh"
          }],
          "V8ra": [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.addButtons = addButtons;
            exports.createSnackbar = createSnackbar;
            exports.reloadComments = reloadComments;
            exports.newCommentsCheck = newCommentsCheck;
            exports.commentSubmissionsHandler = commentSubmissionsHandler;
            exports.formSubmitError = formSubmitError;

            var _settings = require("../../settings.js");

            var _util = require("../util.js");

            var _api = require("../api.js");

            var _drawComments = require("./drawComments.js");

            function addButtons() {
              var div = document.createElement("div");
              div.classList.add("load-more-div");
              var button = document.createElement("button");
              button.id = "nodebb-load-more";
              button.classList.add("btn");
              button.classList.add("btn-primary");
              button.innerText = "Charger plus de commentaires...";
              button.addEventListener("click", function loadMoreClick() {
                if (!$("body").hasClass("hasLoader")) reloadComments(_settings.pagination + 1);
              });
              var text = document.createElement("p");
              text.classList.add("load-more-text");
              text.innerHTML = '<small class="nodebb-copyright">Commentaires avec <a href="' + _settings.dataRes.relative_path + '" target="_blank">' + _settings.dataRes.siteTitle + '</a> &bull; <a href="' + _settings.dataRes.relative_path + '/topic/' + _settings.dataRes.tid + '">Topic originel</a></small>';
              div.appendChild(text);
              div.appendChild(button);
              (0, _util.insertAfter)(div, document.querySelector("#nodebb"));
              var div2 = document.createElement("div");
              div2.classList.add("publishForm");
              div2.innerHTML = '<form id="publishTopic" action="' + _settings.dataRes.relative_path + '/comments/publish" method="post"><button class="btn btn-primary">Publier cet article sur ' + _settings.dataRes.siteTitle + '</button><input type="hidden" name="markdown" id="nodebb-content-markdown" value="' + _settings.dataRes.content + '"/><input type="hidden" name="title" id="nodebb-content-title" value="' + _settings.dataRes.article_title + '" /><input type="hidden" name="cid" id="nodebb-content-cid" value="' + _settings.dataRes.category_id + '" /><input type="hidden" name="blogger" id="nodebb-content-blogger" value="' + _settings.dataRes.blogger + '"/><input type="hidden" name="tags" id="nodebb-content-tags" /><input type="hidden" name="id" value="' + _settings.dataRes.article_id + '" /><input type="hidden" name="url" value="' + _settings.dataRes.redirect_url + '" /><input type="hidden" name="_csrf" value="' + _settings.dataRes.token + '" /><input type="hidden" name="timestamp" value="' + Date.now() + '" /><input type="hidden" name="uid" value="' + _settings.dataRes.user.uid + '" /></form>';
              (0, _util.insertAfter)(div2, document.querySelector("#nodebb"));
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
             */


            function reloadComments() {
              var pag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
              var currentPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
              var showLoader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

              if (currentPage > pag) {
                console.log("finish");

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

              _settings.set.commentsURL(nodeBBURL + "/comments/get/" + (window.blogger || "default") + "/" + articleID + "/" + paging + "/" + _settings.sorting);

              console.log(_settings.commentsURL);

              _settings.XHR.open("GET", _settings.commentsURL, true);

              _settings.XHR.withCredentials = true;

              _settings.XHR.send();
            }

            function newCommentsCheck() {
              if (document.hasFocus()) {
                setInterval(function () {
                  _settings.set.reloading(1);

                  _settings.set.reload(true);

                  reloadComments(_settings.pagination, 0, false);
                }, 120000);
              }
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
            }

            function commentSubmissionsHandler() {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                var _loop = function _loop() {
                  var form = _step.value;
                  form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    var inputs = {};
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                      for (var _iterator2 = form.querySelectorAll("input")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var input = _step2.value;
                        inputs[input.getAttribute("name")] = input.getAttribute("value");
                      }
                    } catch (err) {
                      _didIteratorError2 = true;
                      _iteratorError2 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                          _iterator2.return();
                        }
                      } finally {
                        if (_didIteratorError2) {
                          throw _iteratorError2;
                        }
                      }
                    }

                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                      for (var _iterator3 = form.querySelectorAll("textarea")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _input = _step3.value;
                        inputs.content = _input.value;
                      }
                    } catch (err) {
                      _didIteratorError3 = true;
                      _iteratorError3 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                          _iterator3.return();
                        }
                      } finally {
                        if (_didIteratorError3) {
                          throw _iteratorError3;
                        }
                      }
                    }

                    if (inputs["content"].length < 8) formSubmitError("Message too short", form);else {
                      (0, _api.xpost)(_settings.XHR, form.getAttribute("action"), inputs);
                      setTimeout(function () {
                        _settings.set.reload(true);

                        reloadComments(_settings.pagination, 0, true);
                      }, 500);
                    }
                    return false;
                  });
                };

                for (var _iterator = document.querySelectorAll('form.top-post-form, form.sub-reply-input, form.sub-edit-input')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _loop();
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            }

            function formSubmitError(message, form) {
              form.querySelector(".nodebb-error").innerText = message;
              setTimeout(function () {
                form.querySelector(".nodebb-error").innerText = "";
              }, 3000);
            }
          }, {
            "../../settings.js": "LXja",
            "../util.js": "VGLh",
            "../api.js": "gYYA",
            "./drawComments.js": "xsmJ"
          }],
          "kjEe": [function (require, module, exports) {
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
              var loginButton = clone.querySelectorAll('button.login-button');
              loginButton.classList.add("loading");
              (0, _api.login)(t.querySelector("input[name='email']").value, t.querySelector("input[name='password']").value, t.querySelector("input[name='_csrf']").value); // setTimeout(closeModal, 100);
            }
            /**
             * Closes whatever modal is opened within the plugin
             */


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
              _settings.set.savedText(_settings.contentDiv.value);

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
            }

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
            }

            function loginError(message) {
              var modal = document.querySelector("#login-modal");
              modal.querySelector(".nodebb-error").innerText = message;
              setTimeout(function () {
                modal.querySelector(".nodebb-error").innerText = "";
              }, 3000);
            }
          }, {
            "../../settings.js": "LXja",
            "../comments/loadComments.js": "V8ra",
            "../api.js": "gYYA"
          }],
          "sutU": [function (require, module, exports) {
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
          }, {
            "../settings.js": "LXja",
            "./util.js": "VGLh",
            "./login/modal.js": "kjEe",
            "./login/social.js": "Ca7Q",
            "./login/form.js": "QP4Q",
            "./comments/loadComments.js": "V8ra",
            "./comments/sortComments.js": "JONd",
            "./api.js": "gYYA",
            "./comments/drawComments.js": "xsmJ"
          }],
          "epB2": [function (require, module, exports) {
            "use strict";

            var _settings = require("./settings.js");

            var _onload = require("./general/onload.js");

            var _api = require("./general/api.js");

            var _util = require("./general/util.js");

            var _modal = require("./general/login/modal.js");

            var _loadComments = require("./general/comments/loadComments.js");

            _settings.set.articlePath(window.location.protocol + "//" + window.location.host + window.location.pathname); // set.pluginURL(nodeBBURL + "/plugins/nodebb-comment-dev");


            _settings.set.pluginURL(nodeBBURL + "/plugins/nodebb-plugin-blog-comments-cryptofr");

            (0, _util.loadCSS)(_settings.pluginURL + "/css/comments.css");
            (0, _util.loadCSS)(_settings.pluginURL + "/css/cryptofr.css");
            (0, _util.loadCSS)(_settings.pluginURL + "/css/emoji.css");
            (0, _util.loadCSS)(_settings.pluginURL + "/css/icons.css"); //(0, _util.loadCSS)(_settings.pluginURL + "/css/fontawesome/css/all.css");

            (0, _util.loadCSS)("https://fonts.googleapis.com/css?family=Roboto:100,300,400,700&display=swap"); // set.pluginURL(nodeBBURL + "/plugins/nodebb-plugin-blog-comments-cryptofr");

            (0, _util.loadCSS)("https://fonts.googleapis.com/css?family=Poppins:300,400,400i,500,600,700&display=swap"); // set.pluginURL(nodeBBURL + "/plugins/nodebb-plugin-blog-comments-cryptofr");

            document.getElementById("nodebb-comments").insertAdjacentHTML("beforebegin", '<div class="comments-area" id="nodebb"></div>');

            _settings.set.nodebbDiv(document.getElementById("nodebb"));

            (0, _util.loadScript)("https://www.google.com/recaptcha/api.js");
            (0, _util.loadScript)(_settings.pluginURL + "/css/fontawesome/js/all.js");
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
            (0, _util.windowOnload)();
            (0, _loadComments.newCommentsCheck)();
          }, {
            "./settings.js": "LXja",
            "./general/onload.js": "sutU",
            "./general/api.js": "gYYA",
            "./general/util.js": "VGLh",
            "./general/login/modal.js": "kjEe",
            "./general/comments/loadComments.js": "V8ra"
          }]
        }, {}, ["epB2"], null);
      }, {}]
    }, {}, ["epB2"], null);
  }, {}]
}, {}, ["epB2"], null);
},{}]},{},["epB2"], null)