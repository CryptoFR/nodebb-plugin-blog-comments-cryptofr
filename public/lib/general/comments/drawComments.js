import { set,firstTime,reloading,dataRes,page,sorting,postData,pagination,XHR,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,templates,reload } from "../../settings.js";
import { removeLoader,addTimeAgoRecursive,timeAgo,normalizePost,changeAttribute,addClassHelper,removeNodes,reactElementRelocation, parseLineBreaks, parseCommentQuotes } from "./../util.js"; 
import { prepareModal,onSubmitLogin,onSubmitSignUp,authenticate } from "../login/modal.js"; 
import { addSocialAuthListeners } from "../login/social.js"; 
import { addRegisterValidators } from "../login/form.js"; 
import { reloadComments } from "./loadComments.js"; 
import { setActiveSortingLi,setSorting } from "./sortComments.js"; 
import { upvotePost,downvotePost,xpost,logout, deletePost } from "../api.js";
import { checkExpandableComments } from "./expandComments.js";
import { grecaptchaGrab } from '../login/modal.js';
import { bindEvents, prepareSignout, loadMoreEvent, newerCommentsDisplayEvent } from './events.js'
import { commentEnhancementInit } from "../addons/commentEnhancementBox.js";
import { commentSubmissionsHandler } from "./commentSubmission.js";
import { dispatchEmojis } from "../addons/emoji.js";
import { uploadInit } from "../addons/upload.js";
// import $ from 'jquery';

  // window.drawComments = drawComments
  export function drawComments(res=null,i=0) {


    function afterCommentsDomLoaded(data,res){

      reactElementRelocation(); 
      checkImgProfile(); 

      if (data.isValid && firstTime) {
        addFooterText();
        set.firstTime(false);
      } 


      if (data.isValid && !data.isLastPage ){
        loadMoreEvent();
        showLoadMore()
      } else {
        hideLoadMore()
      }


      if (pagination==0 && !reload) {
        $("#nodebb-comments-list").css('min-height',0);
      }
      else {
        $("#nodebb-comments-list").css('min-height',$("#nodebb-comments-list").height());
      }

      $("body").removeClass("loadmore")

      
      if (reload ){
        reloadComments(pagination,page+1,false)
      }  
      

      prepareSignout(data.token) 

      moveLoadMoreDoms()


      newerCommentsDisplayEvent();

      set.activeUserCommentsReset([]);

      dispatchEmojis();

      // emojiBoxInit();

      uploadInit();
 
    } 
    

    
    removeLoader(); 

    if ( XHR.status >= 200 && XHR.status < 400) {

      var data = {}, html;
 
      data = JSON.parse(XHR.responseText) 

      // /!\ DEV /!\ CHECK SORTING (Compare with LOCALSTORAGE)
      setActiveSortingLi(sorting, data.sorting);


      set.commentsDiv(document.getElementById("nodebb-comments-list"));
      set.commentsCounter(document.getElementById("nodebb-comments-count"));
      set.commentsAuthor(document.getElementById("nodebb-comments-author"));
      set.commentsCategory(document.getElementById("nodebb-comments-category"));
      set.timestamp(data.timestamp)

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
      var flagVote=false;

      set.dataRes(data)
      console.log(data)


  

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



      // ------ PARSE of Comments
      html = parse(data, data.template);
 
      
      // Appending to DOM
      nodebbDiv.innerHTML = normalizePost(html); 

      afterParse()

      var nodebbCommentsList = nodebbDiv.querySelector("#nodebb-comments-list");

      commentEnhancementInit() 


      // Add Sorts
      setActiveSortingLi(sorting);  

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
      
      // Dont know this
      set.contentDiv(document.getElementById("nodebb-content"));
      if (savedText) {
        contentDiv.value = savedText;
      }



      if (nodebbDiv.querySelector('#nodebb-login')){
        nodebbDiv.querySelector('#nodebb-login').addEventListener('click',function(){
          authenticate("login");
        })        
      }


      commentSubmissionsHandler(nodebbDiv.querySelector('form.top-post-form'));



      for (let li of nodebbCommentsList.querySelectorAll('li') ){
        if (!li.getAttribute('data-event')){
          li.querySelector('.post-body').innerHTML=li.querySelector('.post-body').innerHTML.replace('\n','<br>')
          bindEvents(data.user,li)
          let post= data.posts.find(p => p.pid == li.getAttribute('data-pid'))
          if (post && li.closest('ul').getAttribute('id')=='nodebb-comments-list'){
            addBadges(li,post);
          }
        }
      }  


    }

    afterCommentsDomLoaded(data,res);

  }


  function afterParse(){ 
    for (let element of nodebbDiv.querySelectorAll('.special-action.gif img, .user-menu  .profile-image, .first-image .profile-image,.first-image .profile-image')){
      element.setAttribute('src',element.getAttribute('data-src').replace('{relative_path}',nodeBBURL))
    } 

    for (let element of nodebbDiv.querySelectorAll('.alt-logins a')){
      element.setAttribute('data-link',element.getAttribute('data-link').replace('{relative_path}',nodeBBURL))
    } 

  }

  window.afterParse= afterParse




  export function addBadges(li,post){   
    let pid=li.getAttribute('data-pid')
    let selectedGroups= post.user.selectedGroups;

    if (selectedGroups){
      let maxCrypto = 0;
      let maxWebsites = 0;
      for (let group of selectedGroups){
        if ((group.name === "Bitcoin" || group.name === "Ethereum") && maxCrypto<2) {
          let groupDiv=document.createElement('div')
          groupDiv.classList.add('group-badge')

          let span = document.createElement('span');
          span.innerText = " ";
          span.classList.add('crypto-badge');

          let url = nodeBBURL+'/plugins/nodebb-plugin-blog-comments-cryptofr/img/badges/'+group.name.toLowerCase()+'.svg';
          let image = new Image();
          image.src = url;

          span.appendChild(image);
          groupDiv.appendChild(span);

          maxCrypto = maxCrypto + 1;

          li.querySelector('.badges').appendChild(groupDiv)
        } else if ((group.name === "bitcoin.fr" || group.name === "Journalducoin" || group.name === "TheCoinTribune" || group.name === "administrators") && maxWebsites<1) {
          let groupDiv=document.createElement('div')
          groupDiv.classList.add('group-badge')

          let span = document.createElement('span');
          span.innerText = " ";
          span.classList.add('website-badge');

          if (group.name === "bitcoin.fr") {
            span.style.backgroundColor = '#318CE7';
          } else if (group.name === "Journalducoin") {
            span.style.backgroundColor = '#01528C';
            span.classList.add('journalducoin');
          } else if (group.name === "administrators") {
            group.name = "CryptoFR";
            span.style.backgroundColor = '#434A81';
          } else if (group.name === "TheCoinTribune") {
            span.style.backgroundColor = '#1678c1';
          }
          
          let url = nodeBBURL+'/plugins/nodebb-plugin-blog-comments-cryptofr/img/badges/'+group.name.toLowerCase()+'.svg';
          let image = new Image();
          image.src = url;

          span.appendChild(image);
          groupDiv.appendChild(span);

          maxWebsites = maxWebsites + 1;

          li.querySelector('.badges').appendChild(groupDiv)
        }
      }
    }

    if (post.hasOwnProperty('children')){
      for (let childPost of post.children){
        let childLi=li.querySelector('li[data-pid="'+childPost.pid+'"]') 
        if (!childLi){
          console.log('error of childLi on addBadges',childLi)
        }else {
          addBadges(childLi,childPost)
        }
      }
    }

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


          if (reloading) loadedComments=drawCommentFromLoadMore(existingComments,loadedComments)

          if (div.querySelector("#nodebb-comments-list")){
            
            if (pagination==0 || (page ==0 && reload) ){
              div.querySelector("#nodebb-comments-list").innerHTML = loadedComments.innerHTML;
            }
            else {
              // old comments
              div.querySelector("#nodebb-comments-list").innerHTML = document.querySelector("#nodebb-comments-list").innerHTML;
              $($(div).find("#nodebb-comments-list li,#nodebb-comments-list li form")).removeAttr('data-event')

              // new comments
              div.querySelector("#nodebb-comments-list").appendChild(  loadedComments );
              // div.querySelector("#nodebb-comments-list").insertAdjacentHTML( 'beforeend', loadedComments.innerHTML );
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
  function drawCommentFromLoadMore(existingComments,loadedComments){
    for (let comment of loadedComments.querySelectorAll("li")) {
      let flag=false;
      for (let oldcomment of existingComments.querySelectorAll("li")) {
        if (comment.getAttribute("data-pid")==oldcomment.getAttribute("data-pid") && !oldcomment.classList.contains('new-comment')  ) 
          flag=true;
      }

      if (!flag ) {
        comment.classList.add("new-comment");
      }
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
	    clone.querySelector("div.post-body").innerHTML = parseCommentQuotes(comment.content)
      clone.querySelector("div.post-body").innerHTML = parseLineBreaks(clone.querySelector("div.post-body").innerHTML);


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

	    clone.querySelector(".topic-profile-pic").querySelector('a').setAttribute('href',relativePath+"/user/"+comment.user.userslug );
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

      // If connected user is owner of comment
	    if (comment.uid !== uid && !dataRes.isAdmin) {
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


  export function showLoadMore(){
    document.querySelector('#nodebb-load-more').style.display='block'  
  }

  export function hideLoadMore(){
    document.querySelector('#nodebb-load-more').style.display='none';
  }

  export function addFooterText(){ 
    var text = document.querySelector(".load-more-text");  
    text.innerHTML = '<span class="nodebb-copyright">Propulsé par <a href="' + dataRes.relative_path + '" class="comment-logo" target="_blank"><img src="' + dataRes.relative_path + '/plugins/nodebb-plugin-blog-comments-cryptofr/icons/cryptofr-comments.svg" alt="add emojis" class="icon"></a> <span class="hide-mobile">&bull;</span> <a href="' + dataRes.relative_path + '/topic/' + dataRes.tid + '" class="see-topic" target="_blank">Voir le sujet sur le forum</a></span>';
  } 



  /**
   * Creates a snackbar inside the dom
   * @param {string} text text of the snackbar
   * @param {boolean} success whether the snackbar will show a success or error message, this affects the class used by the object
   */

  window.createSnackbar = createSnackbar;
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



  export function moveLoadMoreDoms(){
    $(".load-more-text").insertAfter('#nodebb-comments-list');
    $('.load-more-div').insertAfter('#nodebb-comments-list');
    document.querySelector(".load-more-text").innerHTML = '<span class="nodebb-copyright">Propulsé par <a href="' + dataRes.relative_path + '" class="comment-logo" target="_blank"><img src="' + dataRes.relative_path + '/plugins/nodebb-plugin-blog-comments-cryptofr/icons/cryptofr-comments.svg" alt="add emojis" class="icon"></a> <span class="hide-mobile">&bull;</span> <a href="' + dataRes.relative_path + '/topic/' + dataRes.tid + '" class="see-topic" target="_blank">Voir le sujet sur le forum</a></span>'; 

  }