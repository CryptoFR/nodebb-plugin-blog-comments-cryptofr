(function() {
  "use strict";
  var postTemplate;
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
  function changeAttribute(elements, attribute, value) {
    elements = elements.length !== undefined ? elements : [elements];
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el !== null) {
        el.setAttribute(attribute, value);
      }
    }
  }
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
  function removeNodes(nodes) {
    var nodeList = nodes.length !== undefined ? nodes : [nodes];
    var len = nodeList.length;
    for (var i = 0; i < len; i++) {
      var node = nodeList[i];
      node.parentNode.removeChild(node);
    }
  }
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
        comment.timestamp = timeAgo(parseInt(comment.timestamp, 10));
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

  function xget(xhr, path) {
    xhr.open("GET", path, true);
    xhr.withCredentials = true;
    xhr.send();
    return xhr;
  }
  function encodeData(data) {
    var encodedString = "";
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        if (encodedString.length > 0) {
          encodedString += "&";
        }
        encodedString += encodeURI(prop + "=" + data[prop]);
      }
    }
    return encodedString;
  }

  function xpost(xhr, path, data) {
    var encodedString = "";
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        if (encodedString.length > 0) {
          encodedString += "&";
        }
        encodedString += encodeURI(prop + "=" + data[prop]);
      }
    }
    xhr.open("POST", path, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.withCredentials = true;
    xhr.send(encodedString);
    return xhr;
  }
  function onLoadFunction(xhr) {
    return function onLoadImpl() {
      xhr.isBusy = false;
      reloadComments();
    };
  }
  var XHR = newXHR(),
    pagination = 0;
  var voteXHR = newXHR();
  var loginXHR = newXHR();
  var bookmarkXHR = newXHR();
  loginXHR.onload = function() {
    if (loginXHR.status === 200) {
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
  loginXHR.onerror = removeLoader;
  XHR.onload = onLoadFunction(XHR);
  bookmarkXHR.onload = onLoadFunction(bookmarkXHR);
  voteXHR.onload = onLoadFunction(voteXHR);

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

  function login(username, password, token) {
    if (loginXHR.isBusy) return;
    loginXHR.isBusy = true;
    xpost(loginXHR, nodeBBURL + "/login", {
      username: username,
      password: password,
      _csrf: token,
      remember: "on",
      noscript: false
    });
    addLoader();
  }

  function addLoader() {
    var div = document.createElement("div");
    div.classList.add("loading");
    document.querySelector("body").appendChild(div);
  }

  function removeLoader() {
    var div = document.querySelector("div.loading");
    removeNodes(div);
  }

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
    var modalElement = document.querySelector("#myModal");
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

  function prepareModal(modalTemplate, token) {
    var div = document.createElement("div");
    div.innerHTML = modalTemplate;
    div.querySelector("span.modal-close").onclick = closeModal;
    var form = div.querySelector("form");
    form.onsubmit = onSubmitLogin;
    form.setAttribute("action", nodeBBURL + "/login");
    form.querySelector("input[name='_csrf']").setAttribute("value", token);
    return div;
  }

  function onSubmitLogin(e) {
    e.preventDefault();
    login(
      e.target.querySelector("input[name='email']").value,
      e.target.querySelector("input[name='password']").value,
      e.target.querySelector("input[name='_csrf']").value
    );
    setTimeout(closeModal, 500);
  }

  XHR.onload = function() {
    if (XHR.status >= 200 && XHR.status < 400) {
      var data = JSON.parse(XHR.responseText),
        html;

      commentsDiv = document.getElementById("nodebb-comments-list");
      commentsCounter = document.getElementById("nodebb-comments-count");
      commentsAuthor = document.getElementById("nodebb-comments-author");
      commentsCategory = document.getElementById("nodebb-comments-category");
      postTemplate = data.singleCommentTpl;
      data.relative_path = nodeBBURL;
      data.redirect_url = articlePath;
      data.article_id = articleID;
      data.pagination = pagination;
      data.postCount = parseInt(data.postCount, 10);
      data.loginModalTemplate = data.loginModalTemplate;
      setTimeout(function() {
        document
          .querySelector("body")
          .appendChild(prepareModal(data.loginModalTemplate, data.token));
      }, 0);

      for (var post in data.posts) {
        if (data.posts.hasOwnProperty(post)) {
          data.posts[post].timestamp = timeAgo(
            parseInt(data.posts[post].timestamp),
            10
          );
          if (data.posts[post]["blog-comments:url"]) {
            delete data.posts[post];
          }
        }
      }

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

      if (pagination) {
        html = normalizePost(parse(data, templates.blocks["posts"]));
        commentsDiv.innerHTML = commentsDiv.innerHTML + html;
      } else {
        html = parse(data, data.template);
        nodebbDiv.innerHTML = normalizePost(html);
      }
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
      contentDiv = document.getElementById("nodebb-content");
      setTimeout(function() {
        var lists = nodebbDiv.getElementsByTagName("li");
        for (var list in lists) {
          if (lists.hasOwnProperty(list)) {
            lists[list].className = "";
          }
        }
      }, 100);

      if (savedText) {
        contentDiv.value = savedText;
      }

      if (data.tid) {
        // var loadMore = document.getElementById('nodebb-load-more');
        // loadMore.onclick = function() {
        // 	pagination++;
        // 	reloadComments();
        // }
        // if (data.posts.length) {
        // 	loadMore.style.display = 'inline-block';
        // }

        // if (pagination * 10 + data.posts.length + 1 >= data.postCount) {
        // 	loadMore.style.display = 'none';
        // }

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
        pagination,
      true
    );
    XHR.withCredentials = true;
    XHR.send();
  }

  reloadComments();

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
})();
