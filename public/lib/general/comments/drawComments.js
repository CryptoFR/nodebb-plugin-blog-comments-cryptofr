import { set,reloading,dataRes,page,pluginURL,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates } from "../../settings.js";
import { bindOnClick,removeLoader,addTimeAgoRecursive,timeAgo,normalizePost } from "./../util.js"; 
import { prepareModal,onSubmitLogin,onSubmitSignUp,authenticate } from "../login/modal.js"; 
import { addSocialAuthListeners } from "../login/social.js"; 
import { addRegisterValidators } from "../login/form.js"; 
import { reloadComments,createNestedComments,commentSubmissionsHandler } from "./loadComments.js"; 
import { setActiveSortingLi,setSorting } from "./sortComments.js"; 
import { upvotePost,downvotePost,xpost } from "../api.js";


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
	      
	      var loadedComments = document.createElement('div');
	      loadedComments.innerHTML = nested.innerHTML;
	      var existingComments = document.querySelector("#nodebb-comments-list");


      	  if (reloading) loadedComments=checkNewComments(existingComments,loadedComments)

	      if (page==0){
	        div.querySelector("#nodebb-comments-list").innerHTML = loadedComments.innerHTML;
	      }
	      else {
	        div.querySelector("#nodebb-comments-list").innerHTML = document.querySelector("#nodebb-comments-list").innerHTML;
	        div.querySelector("#nodebb-comments-list").insertAdjacentHTML( 'beforeend', loadedComments.innerHTML );
	      }


	      template = div.innerHTML;
	    }
	    return template;
	  })(data, "", template);
	}


	function checkNewComments(existingComments,loadedComments){


		for (let comment of loadedComments.querySelectorAll("li")) {
			let flag=false;
			for (let oldcomment of existingComments.querySelectorAll("li")) {
				// console.log("comment-"+comment.getAttribute("data-pid")+" / oldcomment-"+oldcomment.getAttribute("data-pid"))
				if (comment.getAttribute("data-pid")==oldcomment.getAttribute("data-pid") && !oldcomment.classList.contains('new-comment')  ) flag=true;
			}
			if (!flag ) comment.classList.add("new-comment");
		}


		set.reloading(0);
		
		return loadedComments;

	}
