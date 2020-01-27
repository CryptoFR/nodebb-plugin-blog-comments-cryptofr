import { set,pluginURL,page,commentXHR,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates,reload } from "../../settings.js";
import { addLoader, addLoaderInside,removeLoader,insertAfter,removeNodes,timeAgo } from "../util.js"; 
import { upvotePost,downvotePost,xpost } from "../api.js";
import { drawComments } from "./drawComments.js";

	export function addButtons() {
    var div = document.createElement("div");
    div.classList.add("load-more-div");
    var button = document.createElement("button");
    button.id = "nodebb-load-more";
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.innerText = "Charger plus de commentaires...";
    button.addEventListener("click", function loadMoreClick() {
    	if (!$("body").hasClass("hasLoader"))
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


	/**
	 * Function that reloads all comments within the DOM
	 */
	export function reloadComments(pag=0,currentPage=0,showLoader=true) {
      	if (currentPage>pagination) {
      		set.reload(false)
      		return null;
      	}
      	if (pag==0) $("#nodebb-comments-list").css('min-height',0);
      	else {
      		$("#nodebb-comments-list").css('min-height',$("#nodebb-comments-list").height());
      		$("body").addClass("loadmore");
      	}
      	set.page(currentPage);
      	set.pagination(pag);
      	set.postData([]);

      	let paging= pagination;
      	if (reload){
      		paging = page;
      	}

;		set.commentsURL(nodeBBURL + "/comments/get/" +(window.blogger || "default") + "/" + articleID +   "/" +  paging + "/" + sorting);
		XHR.open("GET",commentsURL,true);
		XHR.withCredentials = true;
		XHR.send(); 
		if (showLoader) addLoader();
		// else if(insideLoader) addLoaderInside();
	}


	export function newCommentsCheck(){
		if (document.hasFocus()){
			setInterval(function() {
				set.reloading(1);
			    reloadComments(pagination,0,false);
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


	export function commentSubmissionsHandler(){
	  for (let form of document.querySelectorAll('form.top-post-form, form.sub-reply-input, form.sub-edit-input')) {
	    form.addEventListener('submit', function(event){
	      event.preventDefault();        

	      let inputs={};
	      for (let input of form.querySelectorAll("input")) {
	        inputs[input.getAttribute("name")]=input.getAttribute("value");
	      }
	      for (let input of form.querySelectorAll("textarea")) {
	        inputs.content=input.value;
	      }

	      if (inputs["content"].length<8)
	      	formSubmitError("Message too short",form);
	      else {
	      	xpost(XHR, form.getAttribute("action"), inputs);	      
			setTimeout(function() {
				reloadComments(pagination,0,false);
			},500);
		  }
	      return false;
	    });
	  }
	}

	export function formSubmitError(message,form){
		form.querySelector(".nodebb-error").innerText=message;
		setTimeout(function(){
			form.querySelector(".nodebb-error").innerText="";
		},3000)
	}