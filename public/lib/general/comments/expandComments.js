/**************************************

   Expand/Collapse comments functions

***************************************/

export function checkExpandableComments() {
  for (let comment of document.querySelectorAll("#nodebb-comments-list li")) { 
    if (comment.querySelector("ul")) {
      let expandableButton=document.createElement("span");
      expandableButton.classList.add("expandable-button");
      expandableButton.classList.add("expanded");

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
      if (expandableButton.classList.contains('expanded') ){
        let expandedButton = expandableButton;
        expandedButton.classList.remove("expanded");
        expandedButton.classList.add("collapsed");
        let expandedComment=expandedButton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        expandedComment.classList.remove("expanded");
        expandedComment.classList.add("collapsed");
        expandedComment.querySelector("ul:first-of-type").classList.add("collapsed-comments");
      }
      else {
        let collapsedButton = expandableButton;
        collapsedButton.classList.remove("collapsed");
        collapsedButton.classList.add("expanded");
        let collapsedComment=collapsedButton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        collapsedComment.classList.remove("collapsed");
        collapsedComment.classList.add("expanded");
        collapsedComment.querySelector("ul:first-of-type").classList.remove("collapsed-comments");
      }
    });
  }
}