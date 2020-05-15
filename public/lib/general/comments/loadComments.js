import { set,pluginURL,page,commentXHR,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates,reload, dataRes,firstTime } from "../../settings.js";
import { addLoader, addLoaderInside,removeLoader,insertAfter,removeNodes,timeAgo,getCurrentDate,parseCommentQuotes } from "../util.js"; 
import { upvotePost,downvotePost,xpost, newFetch } from "../api.js";
import { checkIfWpAdmin } from '../../integration/wordpress.js';
import { singleGifComment } from "../addons/gifs.js";
import { checkExpandableComments } from "./expandComments.js";
import { parseNewComment } from "./newComment.js";
import { bindEvents } from "./drawComments.js";
 
  export function loadMoreEvent() {   
    var button = document.querySelector("#nodebb-load-more"); 
    button.addEventListener("click", function loadMoreClick() {
      if (!$("body").hasClass("hasLoader")){
        reloadComments(pagination+1);
      }
    });
  }

  export function moveLoadMoreDoms(){
    $(".load-more-text").insertAfter('#nodebb-comments-list');
    $('.load-more-div').insertAfter('#nodebb-comments-list');
    document.querySelector(".load-more-text").innerHTML = '<div class="nodebb-copyright">Propulsé par <a href="' + dataRes.relative_path + '" class="comment-logo" target="_blank"><img src="' + dataRes.relative_path + '/plugins/nodebb-plugin-blog-comments-cryptofr/icons/cryptofr-comments.svg" alt="add emojis" class="icon"></a> <span class="hide-mobile">&bull;</span> <a href="' + dataRes.relative_path + '/topic/' + dataRes.tid + '" class="see-topic" target="_blank">Voir le sujet sur le forum</a></div>';
    // $(".load-more-text").innerHTML = '<div class="nodebb-copyright">Propulsé par <a href="' + dataRes.relative_path + '" class="comment-logo" target="_blank"><img src="' + dataRes.relative_path + '/plugins/nodebb-plugin-blog-comments-cryptofr/icons/cryptofr-comments.svg" alt="add emojis" class="icon"></a> <span class="hide-mobile">&bull;</span> <a href="' + dataRes.relative_path + '/topic/' + dataRes.tid + '" class="see-topic" target="_blank">Voir le sujet sur le forum</a></div>';

  }

  export function showLoadMore(){
    document.querySelector('#nodebb-load-more').style.display='block'  
  }

  export function hideLoadMore(){
    document.querySelector('#nodebb-load-more').style.display='none';
  }

  export function addFooterText(){ 
    var text = document.querySelector(".load-more-text");  
    text.innerHTML = '<div class="nodebb-copyright">Propulsé par <a href="' + dataRes.relative_path + '" class="comment-logo" target="_blank"><img src="' + dataRes.relative_path + '/plugins/nodebb-plugin-blog-comments-cryptofr/icons/cryptofr-comments.svg" alt="add emojis" class="icon"></a> <span class="hide-mobile">&bull;</span> <a href="' + dataRes.relative_path + '/topic/' + dataRes.tid + '" class="see-topic" target="_blank">Voir le sujet sur le forum</a></div>';
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
   *
   * CHECK TO NOT RELOAD ALWAYS
   */
  export function reloadComments(pag=0,currentPage=0,showLoader=true) {
    if (currentPage>pag) {
      // console.log("finish")
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

    if (!checkIfWpAdmin()){
      set.commentsURL(nodeBBURL + "/comments/get/" +(window.blogger || "default") + "/" + articleID +   "/" +  paging + "/" + sorting);
    }
    else set.commentsURL(nodeBBURL + "/comments/getAll/" +(window.blogger || "default") + "/" + articleID );
    
    console.log(commentsURL);
    XHR.open("GET",commentsURL,true);
    XHR.withCredentials = true;
    XHR.send(); 
  }

  // CHECK IF THERE IS NEW COMMENTS AND RELOAD DOM

  // /!\ DON'T DO THAT /!\ >> DON'T RELOAD THE DOM EVERYTIME
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

  // FUNCTION FOR COMMENT SUBMISSION
  export function commentSubmissionsHandler(form){
    form.addEventListener('submit', function(event){
      form.querySelector(".submit-comment").classList.add("loading-button");
      
      event.preventDefault();        

      let inputs={};
      for (let input of form.querySelectorAll("input")) {
        inputs[input.getAttribute("name")]=input.getAttribute("value");
      }
      for (let input of form.querySelectorAll("textarea")) {
        inputs.content=input.value;
      }

      if (inputs["content"].length<8){
      	formSubmitError("Message too short",form);
        form.querySelector(".submit-comment").classList.remove("loading-button");
      }
      else {
        let newLi=null;
        newFetch(form.getAttribute("action"), inputs)
          .then(res => res.json())
          .then((res) => {
          form.querySelector('button.loading-button').classList.remove('loading-button');
          if(/edit/.test(form.getAttribute('action'))) {              
            form.classList.add('hidden');
            editActionHandler(form,inputs);

          } else if (form.classList.contains('top-post-form')) {
            newLi=topReplyHandler(form,res)

          }else if (/reply/.test(form.getAttribute('action'))) {
            form.classList.add('hidden');
            newLi=innerReplyHandler(form,res);
          }  

          if (newLi) bindEvents(res.user,newLi);
          setMaxHeight(document.getElementById('nodebb-comments-list'))
        
        });
      }
      return false;
    });
  }

  function editActionHandler(form,inputs){
    const $postBody = form.closest('div').querySelector('.post-body')
    const content = inputs.content
    $postBody.innerHTML = content;
    $postBody.innerHTML=parseCommentQuotes($postBody.innerHTML)

    singleGifComment($postBody) 

    $(form).hide();
    form.querySelector(".submit-comment").classList.remove("loading-button");
  }

  function topReplyHandler(form,res){
    let $li= document.createElement('li') 
    $li.innerHTML= parseNewComment(res,res.user,dataRes.token,res.tid)
    $li.setAttribute('data-pid',res.pid)
    $li.querySelector('.post-body').innerHTML=parseCommentQuotes($li.querySelector('.post-body').innerHTML)

    const nodebbDiv= document.getElementById("nodebb-comments-list")
    nodebbDiv.prepend($li)
    form.querySelector('textarea').value='';
    form.querySelector('.emoji-wysiwyg-editor').innerHTML='';

    return $li;
  }
 

  function parentCommentSetToDefault($li){ 
    $li.classList.add('expandable');
    $li.classList.add('expanded'); 

    const $topicItem = $li.querySelector('.topic-item');
    $topicItem.classList.remove('replying');
    $topicItem.classList.remove('quoting');
    
    // Hide and clear forms 
    for (const f of $li.querySelector('.topic-item').querySelectorAll('form')) {
      f.classList.add('hidden');
      f.querySelector('textarea').value='';
      f.querySelector('.emoji-wysiwyg-editor').innerHTML='';
    }

  }


  function innerReplyHandler(form,res){
    let $oldLi = form.closest('li');
    parentCommentSetToDefault($oldLi)
    let dataLevel= $oldLi.querySelector('.topic-item').getAttribute('data-level')
 
    let $li = document.createElement('li') 
    $li.innerHTML= parseNewComment(res,res.user,dataRes.token,res.tid,dataLevel); 
    $li.setAttribute('data-pid',res.pid) 
    $li.querySelector('.post-body').innerHTML=parseCommentQuotes($li.querySelector('.post-body').innerHTML)
  
    let parentUl=null;
    
    // Setting Parent ul to append the new li 
    if (dataLevel>='2'){
      $li.querySelector('.topic-item').setAttribute('data-level',2)
      parentUl=$oldLi.parentNode.parentNode.querySelector('ul') 
      $oldLi.classList.remove('expandable');
      $oldLi.classList.remove('expanded');
    }else{
      $li.querySelector('.topic-item').setAttribute('data-level',Number(dataLevel)+1);
      parentUl=$oldLi.querySelector('ul');
    }

    if (!parentUl) {
      const newUL = document.createElement('ul')
      $oldLi.append(
        newUL
      )
      parentUl = newUL
    } 

    parentUl.prepend($li);

    return $li; 
            
  }



  export function formSubmitError(message,form){
    form.querySelector(".nodebb-error").innerText=message;
    setTimeout(function(){
      form.querySelector(".nodebb-error").innerText="";
    },3000)
  }

  export function setMaxHeight(comments){
    for (let ul of comments.querySelectorAll('ul')){
     ul.style.maxHeight='initial';
     setTimeout(function(){
      ul.style.maxHeight=getComputedStyle(ul)['height']
     },1000)
    }
  }