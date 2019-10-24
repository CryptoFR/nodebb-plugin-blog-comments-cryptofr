import { set,reloading,pluginURL,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates } from "./settings.js";
import { onloadXHR,onLoadFunction } from "./general/onload.js"; 
import { newXHR,newXHRFixed } from "./general/api.js"; 
import { loadCSS,removeLoader } from "./general/util.js"; 
import { reloadComments,addButtons,newCommentsCheck } from "./general/comments/loadComments.js"; 


	set.articlePath(window.location.protocol + "//" + window.location.host + window.location.pathname);

	// Dev purposes only
	// set.pluginURL(nodeBBURL + "/plugins/nodebb-comment-dev");
	
	set.pluginURL(nodeBBURL + "/plugins/nodebb-plugin-blog-comments-cryptofr");

	loadCSS(pluginURL + "/css/comments.css")
	loadCSS(pluginURL + "/css/cryptofr.css")

	// Dev purposes only
	// set.pluginURL(nodeBBURL + "/plugins/nodebb-plugin-blog-comments-cryptofr");


	document.getElementById("nodebb-comments").insertAdjacentHTML("beforebegin",'<div class="comments-area" id="nodebb"></div>');
	set.nodebbDiv(document.getElementById("nodebb"));

	// setTimeout(grecaptchaGrab, 1000);

	set.pagination(0);
	set.reloading(0);
	set.postData([]);
	set.sorting("newest");
	
	set.commentsURL(nodeBBURL + "/comments/get/" +(window.blogger || "default") + "/" + articleID +   "/" +  pagination + "/" + sorting);
	// set.commentsURL('http://localhost/projects/test.json');
	
	var XHRaux = newXHR();
	XHRaux.onload = onLoadFunction(XHRaux);
	set.XHR(XHRaux);

	var voteXHRaux=newXHR();
	voteXHRaux.onload = onLoadFunction(voteXHRaux);
	set.voteXHR(voteXHRaux);
	
	var authXHRaux=newXHR();
	authXHRaux.onerror = removeLoader;
	set.authXHR(authXHRaux);

	var bookmarkXHRaux = newXHR();
	bookmarkXHRaux.onload = onLoadFunction(bookmarkXHRaux);
	set.bookmarkXHR(bookmarkXHRaux)6


	var signUpXHRaux = newXHRFixed();
	signUpXHRaux.onerror = removeLoader;
	set.signUpXHR(signUpXHRaux)


	reloadComments();

	set.templates({ blocks: {} });

	addButtons();

	onloadXHR();

	newCommentsCheck();

