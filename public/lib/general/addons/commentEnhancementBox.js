import { emojiBoxInit } from "./emoji.js";
import { gifBoxInit,grab_data } from "./gifs.js";
import { dragElement } from "../util.js";

 
  function commentEnhancementInit(){ 
  	emojiBoxInit();
  	gifBoxInit(); 
  	dragElement();

    if (!document.querySelector(".comments-enhancement-box").getAttribute('data-event')){
      
      //I'm using "click" but it works with any event  

      $('body').on('click', '.close-gif', closeBox )

      document.querySelector(".gif-search").addEventListener("keyup", function(event){
        grab_data(document.querySelector(".gif-search").value)
      });

      document.querySelector(".comments-enhancement-box").setAttribute('data-event','true');
    }  
  }

  
  // CLOSE BOX 
  export function closeBox(){
    document.querySelector(".gifs-box").style.display="none";
    document.querySelector(".gifs-box input").value="";
    
    for (let img of document.querySelectorAll("#gifs-list img")){
     img.parentNode.removeChild(img);
    } 

  }