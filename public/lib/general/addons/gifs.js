import { set, gifCommentBox } from "../../settings.js";
import { dragElement,debounce } from '../util.js';

// url Async requesting function
function httpGetAsync(theUrl, callback){
  // create the request object
  var xmlHttp = new XMLHttpRequest();

  // set the state change callback to capture when the response comes in
  xmlHttp.onreadystatechange = function()
  {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    {
      callback(xmlHttp.responseText);
    }
  }

  // open as a GET call, pass in the url and set async = True
  xmlHttp.open("GET", theUrl, true);

  // call send with no params as they were passed in on the url string
  xmlHttp.send(null);

  return;
}

// callback for the top 8 GIFs of search
function tenorCallback_search(responsetext){
  // parse the json response
  var response_objects = JSON.parse(responsetext); 

  // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (tinygif)

  for (let img of document.querySelectorAll("#gifs-list img")){
   img.parentNode.removeChild(img);
  }

  document.querySelector("#gifs-list").innerHTML="";
  for (let img of response_objects["results"]){
    var element = document.createElement("img");
    element.src=img["media"][0]["nanogif"]["url"];
    element.classList.add("gifs-result");
    element.addEventListener("click", function(event){
      gifCommentBox.value= gifCommentBox.value + "\n ![]("+img["media"][0]["nanogif"]["url"]+")";
      gifCommentBox.parentNode.querySelector(".emoji-wysiwyg-editor").innerText= gifCommentBox.value;
    });
    document.querySelector("#gifs-list").appendChild(element)
  }
  return;
}

// function to call the trending and category endpoints
function grab_data(search_term){
  // set the apikey and limit
  var apikey = "D68S16GQGKWB";
  var lmt = 30;

  // using default locale of en_US
  var search_url = "https://api.tenor.com/v1/search?tag=" + search_term + "&key=" + apikey + "&limit=" + lmt;

  httpGetAsync(search_url,tenorCallback_search);

  // data will be loaded by each call's callback
  return;
}

// OPEN GIF BOX
export function gifBoxInit(){ 
  for (let gifButton of document.querySelectorAll('.special-action.gif .icon')) { 

    gifButton.addEventListener('click', function(event){
      console.log("hola gif")
      let commentsEnhancementBox=document.querySelector(".comments-enhancement-box");

      commentsEnhancementBox.style.display="block";
      set.gifCommentBox(gifButton.closest('form').querySelector("textarea"))

      let emojiSelectionBox=commentsEnhancementBox.querySelector(".emoji-selection");
      let gifSelectionBox=commentsEnhancementBox.querySelector(".gif-selection");

      emojiSelectionBox.style.display="none";
      gifSelectionBox.style.display="block";

      commentsEnhancementBox.querySelector('.header-box .emoji-tab').classList.remove('selected')
      commentsEnhancementBox.querySelector('.header-box .gif-tab').classList.add('selected')

      /*let closeGifBoxIcon = document.querySelector(".gifs-box");

      //I'm using "click" but it works with any event
      document.addEventListener('click', function(event) {
        let isClickInside = closeGifBoxIcon.contains(event.target);
        console.log('event.target',event.target)
        console.log('isClickInside',isClickInside)
        // if (!isClickInside) {
        //   closeGifBox();
        // }
      });*/

    });


  }

  var button = document.querySelector('#emoji-button');
  var picker = new EmojiButton();

  picker.on('emoji', emoji => {
    document.querySelector('input').value += emoji;
  });

  button.addEventListener('click', () => {
    picker.togglePicker(button);
  });

  dragElement(document.querySelector(".comments-enhancement-box"));

  if (!document.querySelector(".gif-search").getAttribute('data-event')){
    
    //I'm using "click" but it works with any event 
    // console.log(document.querySelector('.close-gif'))
    // document.querySelector('.close-gif').addEventListener('click',closeGifBox);

    $('body').on('click', '.close-gif', closeGifBox )

    document.querySelector(".gif-search").addEventListener("keyup", function(event){
      grab_data(document.querySelector(".gif-search").value)
    });

    document.querySelector(".gif-search").setAttribute('data-event','true');
  }  
}
  

// CHECK CONTENT
export function gifContentCheck(){
  for (let comment of document.querySelectorAll(".post-body")){
    while (comment.innerText.indexOf("![")>=0){
      let src=comment.innerHTML.substring(comment.innerHTML.indexOf("](")+2,comment.innerHTML.indexOf(".gif)")+4)
      let imgTag="<img class='gif-post' src='"+src+"'></br>";

      if (comment.innerHTML.substring(comment.innerHTML.indexOf("![]")-6,comment.innerHTML.indexOf("![]"))!="&gt;  " && comment.innerHTML.indexOf("![]") > 1){
        imgTag="</br>"+imgTag;
      }
      comment.innerHTML=comment.innerHTML.substring(0,comment.innerHTML.indexOf("!["))+" "+imgTag+" "+comment.innerHTML.substring(comment.innerHTML.indexOf(".gif)")+5,comment.innerHTML.length);
    }
  }
}

/**
 * Checks for comments
 * @param {HTMLDivElement} comment comment div
 */
export function singleGifComment(comment) {
  while (comment.innerText.indexOf("![")>=0){
    let src=comment.innerHTML.substring(comment.innerHTML.indexOf("](")+2,comment.innerHTML.indexOf(".gif)")+4)
    let imgTag="<img class='gif-post' src='"+src+"'></br>";

    if (comment.innerHTML.substring(comment.innerHTML.indexOf("![]")-6,comment.innerHTML.indexOf("![]"))!="&gt;  " && comment.innerHTML.indexOf("![]") > 1){
      imgTag="</br>"+imgTag;
    }
    comment.innerHTML=comment.innerHTML.substring(0,comment.innerHTML.indexOf("!["))+" "+imgTag+" "+comment.innerHTML.substring(comment.innerHTML.indexOf(".gif)")+5,comment.innerHTML.length);
  }
  return comment
}

// FIX CLOSE GIF
// NOT WORKING !!
export function closeGifBox(){
  document.querySelector(".gifs-box").style.display="none";
  document.querySelector(".gifs-box input").value="";
  
  for (let img of document.querySelectorAll("#gifs-list img")){
   img.parentNode.removeChild(img);
  } 
}