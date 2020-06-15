/**************************************

   Expand/Collapse comments functions

***************************************/

import { setMaxHeight } from "../util.js";

export function checkExpandableComments() {
  for (let comment of document.querySelectorAll("#nodebb-comments-list li")) { 
    if (comment.querySelector("ul") && !comment.querySelector(".expandable-button")) {
      let expandableButton=document.createElement("span");
      expandableButton.classList.add("expandable-button");
      expandableButton.classList.add("expanded");
      expandableButton.innerHTML = '<i class="fad fa-comment-alt-minus"></i>';

      comment.classList.add("expandable");
      comment.classList.add("expanded");
      comment.querySelector(".topic-item > .topic-body > .topic-text > .post-content >small ").appendChild(expandableButton);
    }
  }
  collapseExpandCommentEvent();
}

function collapseExpandCommentEvent() {
  for (let expandableButton of document.querySelectorAll("#nodebb-comments-list li.expandable .expandable-button")) { 
    expandableButton.addEventListener('click',function(e) {
      // collapsing
      if (expandableButton.classList.contains('expanded') ){
        let expandedButton = expandableButton;
        expandedButton.classList.remove("expanded");
        expandedButton.classList.add("collapsed");
        let expandedComment=expandedButton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        expandedComment.classList.remove("expanded");
        expandedComment.classList.add("collapsed");
        expandedComment.querySelector("ul:first-of-type").classList.add("collapsed-comments");
        expandableButton.innerHTML = '<i class="fad fa-comment-alt-plus"></i>';
      }
      // expanding
      else {
        let collapsedButton = expandableButton;
        collapsedButton.classList.remove("collapsed");
        collapsedButton.classList.add("expanded");
        let collapsedComment=collapsedButton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        collapsedComment.classList.remove("collapsed");
        collapsedComment.classList.add("expanded");
        collapsedComment.querySelector("ul:first-of-type").classList.remove("collapsed-comments");
        expandableButton.innerHTML = '<i class="fad fa-comment-alt-minus"></i>';
        setMaxHeight(document.getElementById('nodebb-comments-list'));
      }
    });
  }
}