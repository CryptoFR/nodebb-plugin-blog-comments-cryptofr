// import { removeLoader,addTimeAgoRecursive,timeAgo,normalizePost } from "http://localhost/projects/nodebb-plugin/public/lib/util.js"; 
// import { setActiveSortingLi,setSorting,parse } from "http://localhost/projects/nodebb-plugin/public/lib/main.js"; 
// import { bindOnClick, prepareModal,onSubmitLogin,onSubmitSignUp } from "http://localhost/projects/nodebb-plugin/public/lib/behaviors.js"; 

import { removeLoader,addTimeAgoRecursive,timeAgo,normalizePost } from "https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/lib/util.js"; 
import { setActiveSortingLi,setSorting,parse } from "https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/lib/main.js"; 
import { bindOnClick, prepareModal,onSubmitLogin,onSubmitSignUp } from "https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/lib/behaviors.js"; 

	


export function XHRlisteners(){


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


  /**
   * Callback for global XHR variable, it draws all the data on the DOM
   */
  XHR.onload = function drawComments() {
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
}



/**
 * Callback that's fired whenever a Facebook, Twitter or Github button is clicked for login
 * @param {MouseEvent} event
 */
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

/**
 * Function that adds social auth link listeners
 * @param {DOMElement} modal modal element
 */
function addSocialAuthListeners(modal) {
  var links = modal.querySelectorAll("a[data-link]");
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    a.addEventListener("click", onClickSocialAuth);
  }
}


/**
 * Add "blur" events that will validate the register form
 * @param {DOMElement} modal modal element
 */
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