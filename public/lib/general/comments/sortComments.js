import { set,pluginURL,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates } from "../../settings.js";
import { reloadComments } from "./loadComments.js"; 

  /**
   * Sets a global sorting criteria
   * @param {("newest"|"oldest"|"best")} s the type of the sorting
   */
  export function setSorting(s) {
    set.sorting(s);
    reloadComments(0,0,true,1);
  }
  
  /**
   * Sets the current active sorting button in the comments plugin
   * @param {("newest"|"oldest"|"best")} sorting the type of the sorting
   */
  export function setActiveSortingLi(sorting) {
    var sorted = nodebbDiv.querySelectorAll(
      "a.active[data-component^='sort/']"
    );
    for (var i = 0; i < sorted.length; i++) {
      sorted[i].classList.remove("active");
    }
    var element = nodebbDiv.querySelector(
      "a[data-component='sort/" + sorting + "']"
    );
    if (element) {
      element.parentNode.classList.add("active");
    }
  }
  