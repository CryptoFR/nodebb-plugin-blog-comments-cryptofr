import { set, gifCommentBox } from "../../settings.js";
import { debounce, isHidden } from "../util.js";

export function emojiBoxInit(){ 


    var button = document.querySelector('#emoji-button');
    var picker = new EmojiButton();

    picker.on('emoji', emoji => {
      document.querySelector('input').value += emoji;
    });

    button.addEventListener('click', () => {
      picker.togglePicker(button);
    });

    
  	let commentsEnhancementBox=document.querySelector(".comments-enhancement-box");
  	let emojiSelectionBox=commentsEnhancementBox.querySelector(".emoji-selection");
  	let gifSelectionBox=commentsEnhancementBox.querySelector(".gif-selection"); 
    
    $(document).on('click','.special-action.emojis .fa-smile', function(event){
  		commentsEnhancementBox.style.display="block";
      	emojiSelectionBox.style.display="block";
      	gifSelectionBox.style.display="none";
      	 
      	
      	set.gifCommentBox(this.closest('form').querySelector("textarea"))

      	commentsEnhancementBox.querySelector('.header-box .emoji-tab').classList.add('selected')
      	commentsEnhancementBox.querySelector('.header-box .gif-tab').classList.remove('selected')
  	}) 


	commentsEnhancementBox.querySelector('.header-box .emoji-tab').addEventListener('click',function(){ 

		$(gifCommentBox.closest('form').querySelector('.special-action.emojis .fa-smile')).trigger('click')
      	 
	});

	commentsEnhancementBox.querySelector('.header-box .gif-tab').addEventListener('click',function(){ 
		$(gifCommentBox.closest('form').querySelector('.special-action.gif .icon')).trigger('click')
	
	});

  textareaFocusChangeTarget();

}


export function textareaFocusChangeTarget(){

    function focusHandler(){  
        let commentsEnhancementBox=document.querySelector(".comments-enhancement-box");
        if (!isHidden(commentsEnhancementBox)){
          let selectedTab = commentsEnhancementBox.querySelector('.selected');
          console.log(selectedTab)
          if ($(selectedTab).hasClass('gif-tab')){
            $(this.closest('form').querySelector('.special-action.gif .icon')).trigger('click')
          }
          else if ($(selectedTab).hasClass('emoji-tab')){
            $(this.closest('form').querySelector('.special-action.emojis .fa-smile')).trigger('click')
          }
          
        } 
  }


  $(document).on('click','.emoji-wysiwyg-editor',focusHandler);

}