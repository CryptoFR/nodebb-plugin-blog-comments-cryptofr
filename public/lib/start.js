import { set,reloading,pluginURL,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates } from "./settings.js";
import { onloadXHR,onLoadFunction } from "./general/onload.js";
import { newXHR,newXHRFixed } from "./general/api.js";
import { loadCSS,removeLoader,loadScript,windowOnload,loadScriptHead } from "./general/util.js";
import { grecaptchaGrab,tabIsActive } from "./general/login/modal.js";
import { reloadComments,newCommentsCheck } from "./general/comments/loadComments.js";


  set.articlePath(window.location.protocol + "//" + window.location.host + window.location.pathname);
  
  set.pluginURL(nodeBBURL + "/plugins/nodebb-plugin-blog-comments-cryptofr");

  loadCSS(pluginURL + "/css/comments.css");
  loadCSS(pluginURL + "/css/cryptofr.css");
  loadCSS(pluginURL + "/css/emoji.css");
  loadCSS(pluginURL + "/css/icons.css");
  loadCSS("https://fonts.googleapis.com/css?family=Roboto:100,300,400,700&display=swap");
  loadCSS("https://fonts.googleapis.com/css?family=Poppins:300,400,400i,500,600,700&display=swap");
  

  document.getElementById("nodebb-comments").insertAdjacentHTML("beforebegin",'<div class="comments-area" id="nodebb"></div>');
  set.nodebbDiv(document.getElementById("nodebb"));

  loadScript("https://www.google.com/recaptcha/api.js");
  
  // loadScript(pluginURL + "/css/fontawesome/js/all.js"); 
  // loadScript(pluginURL + "/js/config.js");
  // loadScript(pluginURL + "/js/util.js");
  // loadScript(pluginURL + "/js/jquery.emojiarea.js");
  // loadScript(pluginURL + "/js/emoji-picker.js");
  // loadScript(pluginURL + "/js/emoji-button-3.0.1.min.js");



  setTimeout(grecaptchaGrab, 1000);

  set.pagination(0);
  set.reload(false);
  set.reloading(0);
  set.firstTime(true);

  set.postData([]);
  set.sorting("newest");

  set.commentsURL(nodeBBURL + "/comments/get/" +(window.blogger || "default") + "/" + articleID +   "/" +  pagination + "/" + sorting);
  
  var XHRaux = newXHR();
  XHRaux.onload = onLoadFunction(XHRaux);
  set.XHR(XHRaux);

  var voteXHRaux=newXHR();
  voteXHRaux.onload = onLoadFunction(voteXHRaux);
  set.voteXHR(voteXHRaux);
  
  var commentXHRaux=newXHR();
  commentXHRaux.onload = onLoadFunction(commentXHRaux);
  set.commentXHR(commentXHRaux);
  
  var authXHRaux=newXHR();
  authXHRaux.onerror = removeLoader;
  set.authXHR(authXHRaux);

  var bookmarkXHRaux = newXHR();
  bookmarkXHRaux.onload = onLoadFunction(bookmarkXHRaux);
  set.bookmarkXHR(bookmarkXHRaux);

  var signUpXHRaux = newXHRFixed();
  signUpXHRaux.onerror = removeLoader;
  set.signUpXHR(signUpXHRaux)

  reloadComments();

  set.templates({ blocks: {} });
 
  
  onloadXHR();

  tabIsActive(); 
  newCommentsCheck();