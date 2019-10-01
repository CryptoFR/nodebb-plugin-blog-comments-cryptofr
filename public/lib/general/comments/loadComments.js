import { set,pluginURL,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates } from "../../settings.js";
import { addLoader,removeLoader,insertAfter,changeAttribute,addClassHelper,removeNodes,timeAgo } from "../util.js"; 

	export function addButtons() {
    var div = document.createElement("div");
    div.classList.add("load-more-div");
    var button = document.createElement("button");
    button.id = "nodebb-load-more";
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.innerText = "Charger plus de commentaires...";
    button.addEventListener("click", function loadMoreClick() {
      reloadComments(pagination+1);
    });
    div.appendChild(button);
    insertAfter(div, document.querySelector("#nodebb"));
	}


	/**
	 * Creates a snackbar inside the dom
	 * @param {string} text text of the snackbar
	 * @param {boolean} success whether the snackbar will show a success or error message, this affects the class used by the object
	 */
	export function createSnackbar(text, success) {
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
	 * Function that reloads all comments within the DOM
	 */
	export function reloadComments(pagination=0) {
      	set.pagination(pagination);
      	set.postData([]);
		set.commentsURL(nodeBBURL + "/comments/get/" +(window.blogger || "default") + "/" + articleID +   "/" +  pagination + "/" + sorting);
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
	 * Function that draws nested comments
	 * @param {Array} comments comments data
	 * @param {DOMElement} template comment template
	 * @param {Object} otherData Data to be rendered within the comments that's not the comments themselves
	 * @returns {DOMElement} A node with the nested comments already drawn
	 */
	export function createNestedComments(comments, template, otherData) {
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

