import { set, dataRes, nodebbDiv, commentData, pagination } from "../../settings.js";
import { authenticate } from "../login/modal.js"; 
import { setMaxHeight,removeNodes,timeAgo,selectText } from "../util.js"; 
import { downvotePost,upvotePost,deletePost,logout } from "../api.js"; 
import { commentSubmissionsHandler } from "./commentSubmission.js"; 
import { checkExpandableComments } from "./expandComments.js"; 
import { reloadComments } from "./loadComments.js"; 
import { parseNewComment,enableVoting } from "./newComment.js"; 
import { addBadges } from "./drawComments.js"; 
import { gifBoxInit,gifContentCheck } from "../addons/gifs.js"; 
import { dispatchEmojis } from "../addons/emoji.js"; 


  export function bindEvents(user,li){

    function eventAuth(){
      if (!user || !user.uid) {
        authenticate("login");
        return false;
      }
      return true;
    }

    function initClick(element){

      var dataComponent = element.getAttribute("data-component"); 
      var topicItem = event.target;
      var upvoted = JSON.parse(element.getAttribute("data-upvoted"));
      var downvoted = JSON.parse(element.getAttribute("data-downvoted"));
      while (topicItem && !topicItem.classList.contains("topic-item")) {
        topicItem = topicItem.parentElement;
      }
      var postBody;
      if (/\/(quote|edit)$/.test(dataComponent)) {
        postBody = topicItem.querySelector(".post-content .post-body");
      }
      var pid = topicItem.getAttribute("data-pid");
      var uid = topicItem.getAttribute("data-uid");
      var level = topicItem.getAttribute("data-level");
      var formClass = /\/edit$/.test(dataComponent)
        ? ".sub-edit-input"
        : ".sub-reply-input"; 
      var elementForm = topicItem.querySelector("form" + formClass);
      var formInput = elementForm.querySelector("textarea");
      var nodebbCommentsList = nodebbDiv.querySelector("#nodebb-comments-list");      
      var visibleForm = nodebbCommentsList.querySelector(
        "li .topic-item form:not(.hidden)"
      ); 

      // Hide all other forms
      if (visibleForm && visibleForm !== elementForm) {
        topicItem.classList.remove("replying");
        topicItem.classList.remove("quoting");

        visibleForm.classList.add("hidden");

        let cl = visibleForm.closest('.replying') 
        if (cl) {
          // console.log('remove replying')
          cl.classList.remove('replying')
        }

        cl = visibleForm.closest('.quoting') 
        if (cl) {
          // console.log('remove replying')
          cl.classList.remove('quoting')
        }
      } 

      return {topicItem,pid,uid,level,elementForm,formInput,dataComponent,postBody,upvoted,downvoted} 
    }  

    let flagVote=false;

    if (dataRes.isAdmin || li.querySelector('.topic-item').getAttribute('data-uid')==dataRes.user.uid){
      commentOptions(); 
    }else{
      removeNodes(li.querySelector(".menuButton-container"));  
    }

    li.setAttribute('data-event','true')

    // Reply CLick
    li.querySelector('[data-component="post/reply"]').addEventListener('click',function(){
      if (!eventAuth()) return false;

      $('.editing').removeClass('hidden').removeClass('editing');

      let {topicItem,pid,uid,level,elementForm,formInput,dataComponent,postBody,upvoted,downvoted}= initClick(this);      

      
      // Click to hide
      if (topicItem.classList.contains("replying")){ 
        topicItem.classList.remove("replying");
        elementForm.classList.add("hidden");
        if (!elementForm.parentNode.parentNode.classList.contains('collapsed'))
         setMaxHeight(document.querySelector("#nodebb-comments-list"));
      // click to reply
      } else { 
        formInput.value='';
        elementForm.querySelector(".emoji-wysiwyg-editor").innerHTML =''
        topicItem.classList.add("replying");
        topicItem.classList.remove("quoting");
        elementForm.classList.remove("hidden");

        if (!elementForm.parentNode.parentNode.classList.contains('collapsed'))
         setMaxHeight(document.querySelector("#nodebb-comments-list"));
  
          if (level >= 2) {
            var atStr = "@" + topicItem.getAttribute("data-userslug") + ":"; 
            formInput.value = atStr + " ";
            elementForm.querySelector(".emoji-wysiwyg-editor").innerHTML = atStr + " "; 
          }
      } 
    }) 


    // Quote Click
    li.querySelector('[data-component="post/quote"]').addEventListener('click',function(){
      if (!eventAuth()) return false;
      
      $('.editing').removeClass('hidden').removeClass('editing');

      let {topicItem,pid,uid,level,elementForm,formInput,dataComponent,postBody,upvoted,downvoted}= initClick(this);
      
      //  Click to hide
      if (topicItem.classList.contains("quoting")){
        topicItem.classList.remove("quoting");
        elementForm.classList.add("hidden");
        if (!elementForm.parentNode.parentNode.classList.contains('collapsed'))
         setMaxHeight(document.querySelector("#nodebb-comments-list")); 
        // Click to quote
      } else { 
        formInput.value='';
        elementForm.querySelector(".emoji-wysiwyg-editor").innerHTML =''; 
        topicItem.classList.add("quoting");
        topicItem.classList.remove("replying");
        var quote = (postBody.getAttribute('content') ? postBody.getAttribute('content') : postBody.textContent).split("\n").map(function (line) {
          return line ? "> " + line : line;
        }).join(" \n ");
        
        formInput.value = "@" + topicItem.getAttribute("data-userslug") + " said:\n" + quote;
        elementForm.querySelector(".emoji-wysiwyg-editor").innerHTML = "@" + topicItem.getAttribute("data-userslug") + " said:\n" + quote;
        
        elementForm.classList.remove("hidden");
        
        if (!elementForm.parentNode.parentNode.classList.contains('collapsed'))
         setMaxHeight(document.querySelector("#nodebb-comments-list"));
      }    
    }) 


    // Upvote click
    li.querySelector('[data-component="post/upvote"]').addEventListener('click',function(){
      if (!eventAuth()) return false;

      $('.editing').removeClass('hidden').removeClass('editing');
      
      let {topicItem,pid,uid,level,elementForm,formInput,dataComponent,postBody,upvoted,downvoted}= initClick(this); 

      if (user.uid != uid) {
        let downvoteElement= this.parentNode.querySelector('.downvote')
        let wasDownvoted= downvoteElement.getAttribute('data-downvoted')
        if (!flagVote){
        flagVote=true;
        upvotePost(topicItem, pid, upvoted).then(() => {
          flagVote=false;
          const postValue$ = this.parentNode.querySelector('span.post-value');
          this.setAttribute('data-upvoted', !upvoted)
          downvoteElement.setAttribute('data-downvoted', false)
          // Removing upvote
          if (upvoted==true) {
           postValue$.innerText = Number(postValue$.innerHTML) - 1
           // Upvoting a downvoted comment
          } else if (wasDownvoted=='true'){
             postValue$.innerText = Number(postValue$.innerHTML) + 2
             // Upvoting a comment without vote
           } else {
             postValue$.innerText = Number(postValue$.innerHTML) + 1
           }
          }).catch(console.log);
        }
       }
    })


    // Downvote click
    li.querySelector('[data-component="post/downvote"]').addEventListener('click',function(){
      if (!eventAuth()) return false;

      $('.editing').removeClass('hidden').removeClass('editing');    

      let {topicItem,pid,uid,level,elementForm,formInput,dataComponent,postBody,upvoted,downvoted}= initClick(this);
      
      if (user.uid != uid) {
       let upvoteElement= this.parentNode.querySelector('.upvote')
       let wasUpvoted= upvoteElement.getAttribute('data-upvoted')

       if (!flagVote){
         flagVote=true;
         downvotePost(topicItem, pid, downvoted).then(() => {
           flagVote=false;
           const postValue$ = this.parentNode.querySelector('span.post-value');
           this.setAttribute('data-downvoted', !downvoted)
           upvoteElement.setAttribute('data-upvoted', false)
           // Removing downvote
           if (downvoted) {
             postValue$.innerText = Number(postValue$.innerHTML) + 1
             // Downvoting an upvoted comment
           } else if (wasUpvoted=='true'){
             postValue$.innerText = Number(postValue$.innerHTML) - 2
             // Downvoting a comment without vote
           } else {
             postValue$.innerText = Number(postValue$.innerHTML) - 1
           }
         }).catch(console.log);
       }
      }
    })
 
    
      
    for (const form of li.querySelectorAll('form')){
      commentSubmissionsHandler(form);
    }

    gifContentCheck();
    checkExpandableComments(); 

    dispatchEmojis();
    gifBoxInit();
 
  }


  /**
   * DISPLAY OPTIONS 
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

      if (comment.querySelector(".options-container .edit-option") && !comment.closest('li').getAttribute('data-event')){
          
        // Edit Click
        comment.querySelector(".options-container .edit-option").addEventListener("click",function(){
          
          var nodebbCommentsList = nodebbDiv.querySelector("#nodebb-comments-list"); 
          var visibleForm = nodebbCommentsList.querySelector(
              "li .topic-item form:not(.hidden)"
            ); 
          if (visibleForm) visibleForm.classList.add('hidden');

          $('.editing').removeClass('hidden').removeClass('editing');
          $('.replying, .quoting').removeClass('replying').removeClass('quoting');

          comment.parentNode.querySelector(".sub-edit-input").classList.remove("hidden");
          comment.parentNode.querySelector(".sub-edit-input textarea").value = comment.parentNode.querySelector(".post-body").getAttribute("content"); 
          comment.parentNode.querySelector(".sub-edit-input .emoji-wysiwyg-editor").innerText= comment.parentNode.querySelector(".post-body").getAttribute("content").replace(/<br>|&lt;br&gt;/ig,'\n').replace(/(<([^>]+)>)/ig,"");

          comment.querySelector('.post-body').classList.add('hidden');
          comment.querySelector('.post-tools').classList.add('hidden');
          comment.querySelector('.post-body').classList.add('editing');
          comment.querySelector('.post-tools').classList.add('editing');

          setTimeout(function(){
            setMaxHeight(document.getElementById('nodebb-comments-list'))
          },0)          
        })



        // Delete Click
        comment.querySelector(".options-container .delete-option").addEventListener("click",function(){ 

          if (comment.querySelector('.confirm-delete')) return;

          let div=document.createElement('div');
          div.classList.add('confirm-delete')
          let buttonYes=document.createElement('button')
          buttonYes.classList.add('YesDelete')
          buttonYes.innerText="Yes"
          let buttonNo=document.createElement('button')
          buttonNo.classList.add('NoDelete')
          buttonNo.innerText="No"

          let p=document.createElement('p')
          p.innerText="Are you sure you want to delete this comment?";

          div.append(p)
          div.append(buttonYes)
          div.append(buttonNo)

          comment.append(div)

          buttonYes.addEventListener('click',function(){
            deletePost(comment.parentNode, comment.parentNode.getAttribute("data-pid")).then(() => {
              set.reload(true)
              reloadComments(pagination,0,false);
            }).catch(console.log);
            removeNodes(div)
          })


          buttonNo.addEventListener('click',function(){
            removeNodes(div)
          })

        })


      }

      for (let button of comment.querySelectorAll(".menuButton")) {  
        button.addEventListener("click",function(){ 
          comment.querySelector(".options-container").style.display = "block";
        })
      }
    }
  }


  export function prepareSignout(token){
    // console.log('calling prepare signout', $(".logout-box"))
    $(".logout-box").click(function(){
      logout(token)
      setTimeout(() => reloadComments(0, 0, false), 1000)   
    });
  }



  export function loadMoreEvent() {   
    var button = document.querySelector("#nodebb-load-more"); 
    button.addEventListener("click", function loadMoreClick() {
      if (!$("body").hasClass("hasLoader")){
        reloadComments(pagination+1);
      }
    });
  }




  export function newerCommentsDisplayEvent(){
    document.querySelector('.newer-comments').addEventListener('click',function(){
      for (let comment of commentData){
        // console.log('comment',comment)
        
        let dataLevel=0;
        let parentLi=null;
        let parentLevel=0;

        if (comment.toPid){
          let parentPid= comment.toPid;
          parentLi= document.querySelector('li[data-pid="'+parentPid+'"]')
          if (!parentLi) continue;
          parentLevel= Number(parentLi.querySelector('.topic-item').getAttribute('data-level'))
          if (parentLevel!=2) {
            dataLevel=parentLevel+1
          } else {
            dataLevel=2;
          }
        } 

        let commentTimeStamp=comment.timestamp; 
        if (typeof comment.timestamp === 'number') commentTimeStamp=timeAgo(comment.timestamp) 

        let $li = document.createElement('li') 
        console.log('comment.user',comment.user)
        console.log('dataRes.user',dataRes.user)
        $li.innerHTML= parseNewComment(comment,comment.user,dataRes.token,comment.tid,dataLevel,commentTimeStamp); 

        if (comment.user.uid!= dataRes.user.uid) enableVoting($li);

        $li.setAttribute('data-pid',comment.pid)
        $li.querySelector('.topic-item').setAttribute('data-level',dataLevel)

        if (parentLevel==2){
          let grandParentLi=parentLi.parentNode.parentNode;
          let grandParentUl=grandParentLi.querySelector('ul')
          grandParentUl.prepend($li);
        }else if (parentLi && parentLi.querySelector('ul')){
          parentLi.querySelector('ul').prepend($li)
        }else if (parentLi && !parentLi.querySelector('ul')){
          let parentUl= document.createElement('ul')
          parentUl.append($li)
          parentLi.append(parentUl)
          parentLi.classList.add('expandable')
          parentLi.classList.add('expanded')
        }else if (!parentLi){
          document.querySelector('#nodebb-comments-list').prepend($li)
        }

        $li.querySelector('.post-body').setAttribute('content',$li.querySelector('.post-body').innerHTML)

        bindEvents(dataRes.user,$li)
        addBadges($li,comment) 
      } 
  
      set.timestamp(this.getAttribute('data-timestamp'))   
      setMaxHeight(document.getElementById('nodebb-comments-list'))
      document.querySelector('.newer-comments').style.display="none";
    })
  }
  

  export function markdownSpecialActions(){
    $(document).on('click','.special-action.bold',function(){
      let wysiwyg=this.closest('form').querySelector(".emoji-wysiwyg-editor");
      wysiwyg.innerText=wysiwyg.innerText+"**texte en gras**"; 
      selectText(wysiwyg,"texte en gras");

    })
    $(document).on('click','.special-action.italic',function(){
      let wysiwyg=this.closest('form').querySelector(".emoji-wysiwyg-editor");
      wysiwyg.innerText=wysiwyg.innerText+"*texte en italique*"; 
      selectText(wysiwyg,"texte en italique");

    })
  }



  