import { set,pluginURL,page,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates } from "../../settings.js";
import { addLoader,removeLoader,insertAfter,removeNodes,timeAgo } from "../util.js"; 
import { upvotePost,downvotePost,xpost } from "../api.js";

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
	export function reloadComments(pag=0,currentPage=0,showLoader=true) {
      	if (currentPage>pagination) return null;
      	set.page(currentPage)
      	set.pagination(pag);
      	set.postData([]);
		set.commentsURL(nodeBBURL + "/comments/get/" +(window.blogger || "default") + "/" + articleID +   "/" +  page + "/" + sorting);
		XHR.open("GET",commentsURL,true);
		XHR.withCredentials = true;
		XHR.send();
		console.log(showLoader)
		if (showLoader) addLoader();
	}


	export function newCommentsCheck(){

		setInterval(function() {
			set.reloading(1);
		    reloadComments(pagination);
		}, 60000);

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

