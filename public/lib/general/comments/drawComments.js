import { set,firstTime,reloading,dataRes,page,pluginURL,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates,reload } from "../../settings.js";
import { bindOnClick,removeLoader,addTimeAgoRecursive,timeAgo,normalizePost,changeAttribute,addClassHelper,removeNodes,dispatchEmojis,reactElementRelocation } from "./../util.js"; 
import { prepareModal,onSubmitLogin,onSubmitSignUp,authenticate } from "../login/modal.js"; 
import { addSocialAuthListeners } from "../login/social.js"; 
import { addRegisterValidators } from "../login/form.js"; 
import { reloadComments,commentSubmissionsHandler,addButtons } from "./loadComments.js"; 
import { setActiveSortingLi,setSorting } from "./sortComments.js"; 
import { upvotePost,downvotePost,xpost,logout, deletePost } from "../api.js";
import { checkExpandableComments } from "./expandComments.js";
import { onLoadFunction } from "../onload.js";
import { gifBoxInit,gifContentCheck } from "../addons/gifs.js";
import { uploadInit } from "../addons/upload.js";
import { grecaptchaGrab } from '../login/modal.js';
import { parseCommentQuotes } from '../util.js';
import { checkIfWpAdmin } from '../../integration/wordpress.js';
// import $ from 'jquery';

  // window.drawComments = drawComments
  export function drawComments() {

    // <<REMARK>> might be better to draw and remove after
    removeLoader();

    if (XHR.status >= 200 && XHR.status < 400) {

      var data = JSON.parse(XHR.responseText), html;

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
      data.article_title = articleTitle;
      data.pagination = pagination;
      data.blogger = blogger;
      data.category_id = categoryID;
      data.postCount = parseInt(data.postCount, 10);

      set.dataRes(data);

      // console.log(data)

      if (firstTime && data.isValid) {
        addButtons();set.firstTime(false);
      }

      setTimeout(function() {
        grecaptchaGrab();
        var body = document.querySelector("body");
        var loginModal = prepareModal(
          data.loginModalTemplate,
          data.token,
          onSubmitLogin
        );
        addSocialAuthListeners(loginModal);
        // body.appendChild(loginModal);
        document.querySelector("#nodebb").appendChild(loginModal);
        var registerModal = prepareModal(
          data.registerModalTemplate,
          data.token,
          onSubmitSignUp
        );
        addRegisterValidators(registerModal);
        addSocialAuthListeners(registerModal);
        // body.appendChild(registerModal);
        document.querySelector("#nodebb").appendChild(registerModal);
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
      console.log(data);
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
        '[data-component="post/edit"]',
        '[data-component="post/delete"]'
      ].join(",");

      // CLICK EVENT ON THE DIFFERENT SELECTORS
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

        // CHECK AND .... [COMPLETE]
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
            var quote = (postBody.getAttribute('content')
              ? postBody.getAttribute('content')
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
            elementForm.querySelector(".emoji-wysiwyg-editor").innerHTML=quote;
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
                elementForm.querySelector(".emoji-wysiwyg-editor").innerHTML=atStr + " " + formInput.value;
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
              upvotePost(topicItem, pid, upvoted).then(() => {
    				    set.reload(true)
  				      reloadComments(pagination,0,false);
  			      }).catch(console.log);
            }
          } else if (/\/downvote$/.test(dataComponent)) {
            if (data.user.uid != uid) {
              downvotePost(topicItem, pid, downvoted).then(() => {
                set.reload(true)
                reloadComments(pagination,0,false);
              }).catch(console.log);
            }
          } else if (/\/bookmark$/.test(dataComponent)) {
            bookmarkPost(topicItem, pid, bookmarked).then(() => {
              set.reload(true)
              reloadComments(pagination,0,false);
            }).catch(console.log);
          } else if (/\/delete/.test(dataComponent)) {
            deletePost(topicItem, pid).then(() => {
              set.reload(true)
              reloadComments(pagination,0,false);
            });
          }
        } else {
          if (/\/upvote$/.test(dataComponent)) {
            if (data.user.uid != mainPost.uid) {
              upvotePost(
                nodebbDiv.querySelector(".top-tool-box"),
                mainPost.pid,
                upvoted
              ).then(() => {
                reloadComments(pagination,0,false);
                }).catch(console.log);
            }
          } else if (/\/bookmark$/.test(dataComponent)) {
            bookmarkPost(
              nodebbDiv.querySelector(".top-tool-box"),
              mainPost.pid,
              bookmarked
            ).then(() => {
            	set.reload(true)
              reloadComments(pagination,0,false);
            }).catch(console.log);
          } else if (/\/downvote$/.test(dataComponent)) {
            downvotePost(
              nodebbDiv.querySelector(".top-tool-box"),
              mainPost.pid,
              downvoted
            ).then(() => {
              set.reload(true)
              reloadComments(pagination,0,false);
            }).catch(console.log);
          } else if (/\/delete/.test(dataComponent)) {
            deletePost(topicItem, pid).then(() => {
              set.reload(true)
              reloadComments(pagination,0,false);
            })
          }
        }
      });

      // SORTING COMPONENT
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

      // LOAD MORE
      // <<FIX>> ===> Load more button still display when all post have been shown
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
          document.getElementById("nodebb-login").onclick = function() {
            authenticate("login");
          };
        }
      } else {

        // ADMIN POSSIBILITY
        // <<CHECK>> If moderators too
        // Create the comments and blog POST
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
                data.blogger || "default";
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

    reactElementRelocation();
    gifContentCheck();
    checkImgProfile();

    if (pagination==0 && !reload) {
      $("#nodebb-comments-list").css('min-height',0);
    }
    else {
      $("#nodebb-comments-list").css('min-height',$("#nodebb-comments-list").height());
    }

    $("body").removeClass("loadmore")

    if (reload){
      reloadComments(pagination,page+1,false)
    } 

    commentSubmissionsHandler();
    checkExpandableComments();
    commentOptions();
    dispatchEmojis();
    gifBoxInit();
    prepareSignout(data.token)
    // onLoadFunction();
    // uploadInit();
  }

  function prepareSignout(token){
    // console.log('calling prepare signout', $(".logout-box"))
    $(".logout-box").click(function(){
      logout(token)
      setTimeout(() => reloadComments(0, 0, false), 1000)		
    });
  }

  function checkImgProfile(){
    if (document.querySelector(".first-image img")){
      if (document.querySelector(".first-image img").getAttribute("src")=="")
        $(".first-image img.profile-image").remove()
      else 
        $(".first-image div.profile-image").remove()
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
      // console.log(div)
      if (data && data.hasOwnProperty("posts")) {
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

          // console.log(div)
          if (div.querySelector("#nodebb-comments-list")){
            if (pagination==0 || (page ==0 && reload) ){
              div.querySelector("#nodebb-comments-list").innerHTML = loadedComments.innerHTML;
            }
            else {
              div.querySelector("#nodebb-comments-list").innerHTML = document.querySelector("#nodebb-comments-list").innerHTML;
              div.querySelector("#nodebb-comments-list").insertAdjacentHTML( 'beforeend', loadedComments.innerHTML );
            }
          } 

          if (checkIfWpAdmin()){
              console.log(document.querySelectorAll("#nodebb-comments-list"))
              for (let commentUL of document.querySelectorAll("#nodebb-comments-list")){
                if (commentUL.getAttribute('data-mainpid')!=data.mainPost.pid)
                  parentNodebbComments.appendChild(commentUL);
              } 
          }

        template = div.innerHTML;
      }
      return template;
    })(data, "", template);
  }


  /**
   * Check new comments
   * <<CORRECT>> @param {Object} data the data to be put on the template
   * @returns {Array} of loaded comments
   */
  function checkNewComments(existingComments,loadedComments){
    for (let comment of loadedComments.querySelectorAll("li")) {
      let flag=false;
      for (let oldcomment of existingComments.querySelectorAll("li")) {
        if (comment.getAttribute("data-pid")==oldcomment.getAttribute("data-pid") && !oldcomment.classList.contains('new-comment')  ) 
          flag=true;
      }
      if (!flag ) comment.classList.add("new-comment");
    }

    set.reloading(0);

    return loadedComments;
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
	    clone.querySelector("button[data-reply-button]").innerHTML =
	      "<span>Répondre à " + comment.user.username +'</span><i class="fad fa-circle-notch fa-spin"></i>';
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
	    clone.querySelector("div.post-body").setAttribute("content",comment.content)
	    clone.querySelector("div.post-body").innerHTML = comment.content;

	    clone.querySelector("div.post-body").innerHTML = parseCommentQuotes(clone.querySelector("div.post-body").innerHTML)


	    var img = clone.querySelector("img.profile-image");
	    var divImgText = clone.querySelector("div.profile-image");

	    if (comment.user.picture) {
	      changeAttribute(img, "src", comment.user.picture);
	      changeAttribute(img, "alt", comment.user.username);
	      changeAttribute(img, "title", comment.user.username);
	      divImgText.style.display="none"
	      removeNodes(divImgText);
	    } else {
	      changeAttribute(divImgText, "title", comment.user.username);
	      changeAttribute(divImgText, "alt", comment.user.username);
        divImgText.innerText = comment.user["icon:text"];
        divImgText.style.backgroundColor = comment.user["icon:bgColor"];
	      img.style.display="none"
	      removeNodes(img);
	    }

	    clone.querySelector("a.username").setAttribute('href',relativePath+"/user/"+comment.user.userslug );
	    clone.querySelector("span[data-strong-username]").innerText =
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
	      removeNodes(clone.querySelector("a.delete"));
	      removeNodes(clone.querySelector(".menuButton-container"));
	    } 

	    clone.querySelector("span[data-timestamp]").setAttribute("title",comment.timestampISO.split("T")[0])
	    clone.querySelector("span[data-timestamp]").innerText =
	      comment.timestamp;
	    if (uid === comment.user.uid) {
	      var todisableAnchors = clone.querySelectorAll('a[data-component="post/upvote"], a[data-component="post/downvote"]');
	      for (var i = 0; i < todisableAnchors.length; i++) {
	        todisableAnchors[i].classList.add("disabled");
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
   * DISPLAY OPTIONS
   * WHY with JS??
   */
  function commentOptions (){ 

    $(document).click(function(e) 
    {
      var container = $(".menuButton"); 
      if (!container.is(e.target) && container.has(e.target).length === 0) 
      {
        $(".options-container").hide();
      }
    });

    $(document).mouseover(function(e) 
    {
      var container = $("#nodebb-comments-list .topic-body"); 
      if (!container.is(e.target) && container.has(e.target).length === 0) 
      {
        $(".options-container").hide();
      }
    });

    for (let comment of document.querySelectorAll("#nodebb-comments-list .topic-body")) {

      if (comment.querySelector(".options-container .edit-option")){

        // EDIT BUTTON
        comment.querySelector(".options-container .edit-option").addEventListener("click",function(){
          comment.parentNode.querySelector(".sub-edit-input").classList.remove("hidden");
          comment.parentNode.querySelector(".sub-edit-input textarea").value = comment.parentNode.querySelector(".post-body").getAttribute("content");  
          comment.parentNode.querySelector(".sub-edit-input .emoji-wysiwyg-editor").innerText= comment.parentNode.querySelector(".post-body").getAttribute("content");
        })

        // DELETE BUTTON
        comment.querySelector(".options-container .delete-option").addEventListener("click",function(){
          deletePost(comment.parentNode, comment.parentNode.getAttribute("data-pid"));
          reloadComments(pagination,0,false);
        })
      }

      for (let button of comment.querySelectorAll(".menuButton")) {  
        button.addEventListener("click",function(){ 
          comment.querySelector(".options-container").style.display = "block";
        })
      }
    }
  }