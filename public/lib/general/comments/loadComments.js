import { set,pluginURL,page,commentXHR,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates,reload, dataRes,firstTime } from "../../settings.js";
import { addLoader, addLoaderInside,removeLoader,insertAfter,removeNodes,timeAgo } from "../util.js"; 
import { upvotePost,downvotePost,xpost, newFetch } from "../api.js";
import { checkIfWpAdmin } from '../../integration/wordpress.js';
import { singleGifComment } from "../addons/gifs.js";


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
    text.innerHTML = '<div class="nodebb-copyright">Propulsé par <a href="' + dataRes.relative_path + '" class="comment-logo" target="_blank"><img src="' + dataRes.relative_path + '/plugins/nodebb-plugin-blog-comments-cryptofr/icons/cryptofr-comments.svg" alt="add emojis" class="icon"></a> <span class="hide-mobile">&bull;</span> <a href="' + dataRes.relative_path + '/topic/' + dataRes.tid + '" class="see-topic" target="_blank">Voir le sujet sur le forum</a></div>';

    div.appendChild(button);

    div.appendChild(text);
    
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
  export function commentSubmissionsHandler(){
    for (let form of document.querySelectorAll('form.top-post-form, form.sub-reply-input, form.sub-edit-input')) {
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
          newFetch(form.getAttribute("action"), inputs)
            .then(res => res.json())
            .then((res) => {
            if(/edit/.test(form.getAttribute('action'))) {
              const $postBody = form.closest('div').querySelector('.post-body')
              const content = inputs.content
              $postBody.innerHTML = content;
              singleGifComment($postBody)
              set.reload(true)
              $(form).hide();
              form.querySelector(".submit-comment").classList.remove("loading-button");
            } else {
              const $li = form.closest('li').cloneNode(true);
              let ul=form.parentNode.parentNode.querySelector('ul')
              if (!ul) {
                const newUL = document.createElement('ul')
                form.parentNode.parentNode.append(
                  newUL
                )
                ul = newUL
              }
              ul.appendChild($li);
              const $childUL = $li.querySelector('ul')
              if ($childUL) {
                removeNodes($childUL);
              }
              const $postBody = $li.querySelector('.post-body')
              $postBody.setAttribute('content', res.content)
              console.log(res)
              for(const pidField of ul.querySelectorAll('[data-pid]')) {
                pidField.setAttribute('data-pid', res.pid)
              }
              for (const uidField of ul.querySelectorAll('[data-uid]')) {
                uidField.setAttribute('data-uid', res.user.uid)
              }
              $postBody.innerHTML = res.content;
              singleGifComment($postBody);
              console.log('post body', $postBody);
              // reloadComments(pagination,0,true);
            }
          });
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