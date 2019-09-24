import { set,pluginURL,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates } from "./settings.js";
import { onloadXHR,onLoadFunction } from "./general/onload.js"; 
import { newXHR,newXHRFixed } from "./general/api.js"; 
import { loadCSS,removeLoader } from "./general/util.js"; 
import { reloadComments,addButtons } from "./general/comments/loadComments.js"; 


		set.articlePath(window.location.protocol + "//" + window.location.host + window.location.pathname);

		// set.pluginURL(nodeBBURL + "/plugins/nodebb-plugin-blog-comments-cryptofr");
    set.pluginURL("http://localhost/projects/nodebb-plugin/public");

		// set.commentsURL(nodeBBURL + "/comments/get/" +(window.blogger || "default") + "/" + articleID +   "/" +  pagination + "/" + sorting);
		set.commentsURL('http://localhost/projects/test.json');

		loadCSS(pluginURL + "/css/comments.css")
		loadCSS(pluginURL + "/css/cryptofr.css")

		document.getElementById("nodebb-comments").insertAdjacentHTML("beforebegin",'<div class="comments-area" id="nodebb"></div>');
		set.nodebbDiv(document.getElementById("nodebb"));

		// setTimeout(grecaptchaGrab, 1000);

		set.pagination(0);
		set.postData([]);
		set.sorting("newest");
		
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
		set.bookmarkXHR(bookmarkXHRaux)


		var signUpXHRaux = newXHRFixed();
		signUpXHRaux.onerror = removeLoader;
		set.signUpXHR(signUpXHRaux)


		reloadComments();

		set.templates({ blocks: {} });

		addButtons();

		onloadXHR();
	