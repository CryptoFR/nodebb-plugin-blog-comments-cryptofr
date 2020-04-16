import { set,pluginURL,page,commentXHR,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates,reload, dataRes,firstTime } from "../../settings.js";
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
	    var text = document.createElement("p");
	    text.classList.add("load-more-text");
        text.innerHTML = '<div class="nodebb-copyright">Propulsé par <a href="' + _settings.dataRes.relative_path + '" class="comment-logo" target="_blank"><img src="' + _settings.dataRes.relative_path + '/plugins/nodebb-plugin-blog-comments-cryptofr/icons/cryptofr-comments.svg" alt="add emojis" class="icon"></a> &bull; <a href="' + _settings.dataRes.relative_path + '/topic/' + _settings.dataRes.tid + '" class="see-topic">Voir le sujet sur le forum</a></div>';
	    div.appendChild(text);
	    div.appendChild(button);
	    insertAfter(div, document.querySelector("#nodebb"));


	    var div2 = document.createElement("div");
	    div2.classList.add("publishForm");
	    div2.innerHTML='<form id="publishTopic" action="'+dataRes.relative_path+'/comments/publish" method="post"><button class="btn btn-primary">Publier cet article sur '+dataRes.siteTitle+'</button><input type="hidden" name="markdown" id="nodebb-content-markdown" value="'+dataRes.content+'"/><input type="hidden" name="title" id="nodebb-content-title" value="'+dataRes.article_title+'" /><input type="hidden" name="cid" id="nodebb-content-cid" value="'+dataRes.category_id+'" /><input type="hidden" name="blogger" id="nodebb-content-blogger" value="'+dataRes.blogger+'"/><input type="hidden" name="tags" id="nodebb-content-tags" /><input type="hidden" name="id" value="'+dataRes.article_id+'" /><input type="hidden" name="url" value="'+dataRes.redirect_url+'" /><input type="hidden" name="_csrf" value="'+dataRes.token+'" /><input type="hidden" name="timestamp" value="'+Date.now()+'" /><input type="hidden" name="uid" value="'+dataRes.user.uid+'" /></form>';
	    insertAfter(div2, document.querySelector("#nodebb"));
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
      	if (currentPage>pag) {
      		console.log("finish")
      		set.reload(false)
      		return null;
      	}
 
      	if (pag>0) {
      		$("body").addClass("loadmore");
      	}

      	set.page(currentPage);
      	set.pagination(pag);
      	set.postData([]);

      	let paging= pagination;
      	if (reload){
      		paging = page;
      	}

		if (showLoader) addLoader();

		set.commentsURL(nodeBBURL + "/comments/get/" +(window.blogger || "default") + "/" + articleID +   "/" +  paging + "/" + sorting);
		console.log(commentsURL);
		XHR.open("GET",commentsURL,true);
		XHR.withCredentials = true;
		XHR.send(); 
	}


	export function newCommentsCheck(){
		if (document.hasFocus()){
			setInterval(function() {
				set.reloading(1);
				set.reload(true);
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
				set.reload(true)
				reloadComments(pagination,0,true);
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