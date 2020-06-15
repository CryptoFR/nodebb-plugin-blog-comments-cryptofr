
  // FUNCTION FOR COMMENT SUBMISSION
  export function commentSubmissionsHandler(form){
    if (form.getAttribute('data-event')) return;
    form.setAttribute('data-event','true')

    // console.log(form)

    form.addEventListener('submit', function(event){
      form.querySelector(".submit-comment").classList.add("loading-button");
      
      event.preventDefault();        

      let inputs={};
      for (let input of form.querySelectorAll("input")) {
        inputs[input.getAttribute("name")]=input.getAttribute("value");
      }
      for (let input of form.querySelectorAll("textarea")) {
        inputs.content=input.value;
        // inputs.content=form.querySelector('.emoji-wysiwyg-editor').innerHTML;
      }
      
      inputs.content=inputs.content.replace(/<br>|&lt;br&gt;/ig,'\n').replace(/(<([^>]+)>)/ig,"")
      console.log('inputs', inputs)
      // ERROR: Comment too short
      if (inputs["content"].length<8){
      	formSubmitError("Message too short",form);
        form.querySelector(".submit-comment").classList.remove("loading-button");
      } // ERROR: Comment Too Long
      else if (inputs["content"].length>30000){
        formSubmitError("Message too Long",form);
        form.querySelector(".submit-comment").classList.remove("loading-button");
      } // OK! Sending Reply or Edit POST
      else { 
        let newLi=null;
        newFetch(form.getAttribute("action"), inputs)
          .then(res => res.json())
          .then((res) => {
          form.querySelector('button').classList.remove('loading-button');
          if(/edit/.test(form.getAttribute('action'))) {              
            editActionHandler(form,inputs);
            form.classList.add('hidden');
            $('.editing').removeClass('hidden').removeClass('editing');

          } else if (form.classList.contains('top-post-form')) {
            newLi=topReplyHandler(form,res)

          }else if (/reply/.test(form.getAttribute('action'))) {
            form.classList.add('hidden');
            newLi=innerReplyHandler(form,res);
          }  

          if (newLi) {
            bindEvents(res.user,newLi);
            addBadges(newLi,res);
            set.activeUserComments(res);
          }

          $(newLi).find('.post-body img').each(function(){
            this.onload=function(){
              setMaxHeight(document.getElementById('nodebb-comments-list')) 
            }
          })       
        });
      }
      return false;
    });
  }

  function editActionHandler(form,inputs){
    const $postBody = form.closest('div').querySelector('.post-body')
    const content = inputs.content
    $postBody.innerHTML = content;
    $postBody.setAttribute('content',content)
    $postBody.innerHTML=parseCommentQuotes($postBody.innerHTML)

    singleGifComment($postBody) 

    form.classList.add('hidden')
    form.querySelector(".submit-comment").classList.remove("loading-button");
  }

  function topReplyHandler(form,res){
    let $li= document.createElement('li') 
    $li.innerHTML= parseNewComment(res,res.user,dataRes.token,res.tid)
    $li.querySelector('.post-body').setAttribute('content',$li.querySelector('.post-body').innerHTML)
    $li.setAttribute('data-pid',res.pid)
    
    $li.querySelector('.post-body').innerHTML=parseCommentQuotes($li.querySelector('.post-body').innerHTML)
    $li.querySelector('.post-body').innerHTML=$li.querySelector('.post-body').innerHTML.replace(/\n/gim,'<br>')

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


    $li.querySelector('.post-body').setAttribute('content',$li.querySelector('.post-body').innerHTML)

    $li.setAttribute('data-pid',res.pid) 
    $li.querySelector('.post-body').innerHTML=parseCommentQuotes($li.querySelector('.post-body').innerHTML)
    $li.querySelector('.post-body').innerHTML=$li.querySelector('.post-body').innerHTML.replace(/\n/gim,'<br>')

    singleGifComment($li.querySelector('.post-body')) 
    
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