import { set,dataRes,page,pluginURL,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates } from "../../settings.js";
import { bindOnClick,removeLoader,addTimeAgoRecursive,timeAgo,normalizePost } from "./../util.js"; 
import { prepareModal,onSubmitLogin,onSubmitSignUp,authenticate } from "../login/modal.js"; 
import { addSocialAuthListeners } from "../login/social.js"; 
import { addRegisterValidators } from "../login/form.js"; 
import { reloadComments } from "./loadComments.js"; 
import { setActiveSortingLi,setSorting } from "./sortComments.js"; 
import { upvotePost,downvotePost,xpost } from "../api.js";
import { parse } from "./parseCommentTemplate.js";


	export function drawComments() {

		// console.log(XHR);

	  removeLoader();
	  if (XHR.status >= 200 && XHR.status < 400) {

	    var data = JSON.parse(XHR.responseText),
	      html;
	    set.dataRes(data);
	    setActiveSortingLi(sorting, data.sorting);
	    set.commentsDiv(document.getElementById("nodebb-comments-list"));
	    set.commentsCounter(document.getElementById("nodebb-comments-count"));
	    set.commentsAuthor(document.getElementById("nodebb-comments-author"));
	    set.commentsCategory(document.getElementById("nodebb-comments-category"));
	    set.postTemplate(data.singleCommentTpl);
	    set.wholeTemplate(data.template);
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
	    // nodebbDiv.insertAdjacentHTML('beforeend', normalizePost(html));
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
	            reloadComments(pagination);
	          }
	        } else if (/\/downvote$/.test(dataComponent)) {
	          if (data.user.uid != uid) {
	            downvotePost(topicItem, pid, downvoted);
	            reloadComments(pagination);
	          }
	        } else if (/\/bookmark$/.test(dataComponent)) {
	          bookmarkPost(topicItem, pid, bookmarked);
	          reloadComments(pagination);
	        }
	      } else {
	        if (/\/upvote$/.test(dataComponent)) {
	          if (data.user.uid != mainPost.uid) {
	            upvotePost(
	              nodebbDiv.querySelector(".top-tool-box"),
	              mainPost.pid,
	              upvoted
	            );
	            reloadComments(pagination);
	          }
	        } else if (/\/bookmark$/.test(dataComponent)) {
	          bookmarkPost(
	            nodebbDiv.querySelector(".top-tool-box"),
	            mainPost.pid,
	            bookmarked
	          );
	          reloadComments(pagination);
	        } else if (/\/downvote$/.test(dataComponent)) {
	          downvotePost(
	            nodebbDiv.querySelector(".top-tool-box"),
	            mainPost.pid,
	            downvoted
	          );
	          reloadComments(pagination);
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
	    set.contentDiv(document.getElementById("nodebb-content"));
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
      reloadComments(pagination,page+1)
	  commentSubmissionsHandler();

	}

	function commentSubmissionsHandler(){
	  for (let form of document.querySelectorAll('form.top-post-form, form.sub-reply-input, form.sub-edit-input')) {
	    form.addEventListener('submit', function(evt){
	      evt.preventDefault();        
	      

	      let inputs={};
	      for (let input of form.querySelectorAll("input")) {
	        inputs[input.getAttribute("name")]=input.getAttribute("value");
	      }
	      for (let input of form.querySelectorAll("textarea")) {
	        inputs.content=input.value;
	      } 

	      let res=xpost(XHR, form.getAttribute("action"), inputs);
	      console.log("pag/"+pagination)
	      reloadComments(pagination);

	    });
	  }
	}
