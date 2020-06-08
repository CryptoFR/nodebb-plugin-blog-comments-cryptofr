import { set, gifCommentBox } from "../../settings.js";

export function emojiBoxInit(){ 
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

}