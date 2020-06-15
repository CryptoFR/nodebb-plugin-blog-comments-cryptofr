import { set,reload,page, commentsURL, commentData, activeUserComments, dataRes,XHR, pagination,timestamp, sorting} from "../../settings.js";
import { addLoader } from "../util.js"; 
import { getNewerComments } from "../api.js"; 


  /**
   * Function that reloads all comments within the DOM 
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

    set.commentsURL(nodeBBURL + "/comments/get/" +(window.blogger || "default") + "/" + articleID +   "/" +  paging + "/" + sorting);
    
    console.log(commentsURL);

    XHR.open("GET",commentsURL,true);
    XHR.withCredentials = true;
    XHR.send(); 

  }

  // CHECK IF THERE IS NEW COMMENTS AND RELOAD  
  export function newCommentsCheck(){ 
      setInterval(function() { 
        
        getNewerComments(timestamp,dataRes.tid)
        .then(res => res.json())
        .then((res) => { 
          set.commentData(res.postsData)

          set.commentData(commentData.filter(p => !activeUserComments.find(z => z.pid === p.pid))) 

          if (commentData.length>0){
            document.querySelector('.new-comments-counter').innerText=commentData.length;
            document.querySelector('.newer-comments').style.display="block";
            document.querySelector('.newer-comments').setAttribute('data-timestamp',res.timestamp) 
          } 

        })


      }, 10000); 
  }


 


