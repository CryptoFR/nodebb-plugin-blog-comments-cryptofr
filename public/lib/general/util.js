import { pluginURL } from "../settings.js";

  /**
   * Utility function that recursively parses the timestamp of each of the posts
   * in order to show a human representation of that timestamp
   * @param {Array} posts
   */
  export function addTimeAgoRecursive(posts) {
    var len = posts.length;
    for (var i = 0; i < len; i++) {
      var post = posts[i];
      post.timestamp = timeAgo(parseInt(post.timestamp, 10));
      if (post.children && post.children.length) {
        var childrenLen = post.children.length;
        for (var j = 0; j < childrenLen; j++) {
          addTimeAgoRecursive(post.children[j]);
        }
      }
    }
  }

  /**
   * @param {Number} time time in seconds
   * @returns {String} a human representation of the time spent in French
   */
  export function timeAgo(time) {
    var time_formats = [
      [60, "secondes", 1],
      [120, "il y a une minute"],
      [3600, "minutes", 60],
      [7200, "il y a une heure"],
      [86400, "heures", 3600],
      [172800, "hier"],
      [604800, "jours", 86400],
      [1209600, "la semaine dernière"],
      [2419200, "semaines", 604800],
      [4838400, "le mois dernier"],
      [29030400, "mois", 2419200],
      [58060800, "il y a un an"],
      [2903040000, "ans", 29030400]
    ];

    var seconds = (+new Date() - time) / 1000;

    if (seconds < 10) {
      return "à l'instant";
    }

    var i = 0,
      format;
    while ((format = time_formats[i++])) {
      if (seconds < format[0]) {
        if (!format[2]) {
          return format[1];
        } else {
          return "il y a " + Math.floor(seconds / format[2]) + " " + format[1];
        }
      }
    }
    return time;
  }

  export function getCurrentDate(){
    let date_ob = new Date(); 
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear(); 

    // prints date & time in YYYY-MM-DD format
    return (year + "-" + month + "-" + date);
  }

  export function removeNodes(nodes) {
    var nodeList = nodes && nodes.length !== undefined ? nodes : [nodes];
    var len = nodeList.length;
    if (nodes) for (var i = 0; i < len; i++) {
      var node = nodeList[i];
      node.parentNode.removeChild(node);
    }
  }

  /**
   * Adds a loading div for the plugin loading
   */
  export function addLoader() {
    if (document.querySelector("div.loading")) {
      return;
    }
    var div = document.createElement("div");
    div.classList.add("loading");
    div.innerHTML = "<img src='"+nodeBBURL+"/plugins/nodebb-plugin-blog-comments-cryptofr/img/loader.gif'>";

    if (document.querySelector(".load-more-div"))
      document.querySelector(".load-more-div").appendChild(div);
    else 
      document.querySelector("#nodebb").appendChild(div);
    
    document.querySelector("body").classList.add("hasLoader");
  }



  /**
   * Removes the loading div from the DOM
   */
  export function removeLoader() {
    var div = document.querySelector("#nodebb-comments-list div.loading");
    if (div) removeNodes(div);
    document.querySelector("body").classList.remove("hasLoader");
  }


  /**
   * Adds the URL of the NodeBB forum to the post's html
   * @param {string} post post html
   * @returns {string} normalized post
   */
  export function normalizePost(post) {
    return post
      .replace(/href="\/(?=\w)/g, 'href="' + nodeBBURL + "/")
      .replace(/src="\/(?=\w)/g, 'src="' + nodeBBURL + "/");
  }



  export function loadCSS(url) {
    var stylesheet = document.createElement("link");
    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute("type", "text/css");
    stylesheet.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(stylesheet);
  } 

  export function loadScript(url){
    var script = document.createElement('script'); 
    // script.async = true;
    // script.defer = true;
    script.src = url;
    (document.getElementsByTagName('body')[0]).appendChild(script);
  }


  export function loadScriptHead(url){
    var script = document.createElement('script'); 
    // script.async = true;
    // script.defer = true;
    script.src = url;
    document.getElementsByTagName('head')[0].insertBefore(script, document.getElementsByTagName('head')[0].firstChild);
  }

  
  
  /**
   * Bind on Click event for nodeList
   * @param {Array<DOMElement>} nodeList nodes for with the click event will be added
   * @param {Function} handler a handler
   */
  export var bindOnClick = function(nodeList, handler) {
    for (var i = nodeList.length - 1; i >= 0; i--) {
      nodeList[i].onclick = handler;
    }
  };



  export function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
  

  /**
  * Function that changes a single attribute to a group of DOM Elements
  * @param {Array<DOMElement> | DOMElement} elements the group of elements
  * @param {String} attribute the attribute to change
  * @param {String} value the value we are going to assign to these elements
  */
  export function changeAttribute(elements, attribute, value) {
    elements = elements.length !== undefined ? elements : [elements];
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el !== null) {
        el.setAttribute(attribute, value);
      }
    }
  }

  /**
  * Toggle class helper. It tests "value" and if true, the helper adds the "classTrueValue" string to the element
  * otherwise it adds the "classFalseValue"
  * @param {DOMElement} element
  * @param {any} value this value will be coerced to Boolean
  * @param {String} classTrueValue
  * @param {String} classFalseValue
  */
  export function addClassHelper(element, value, classTrueValue, classFalseValue) {
    var classToAdd = value ? classTrueValue : classFalseValue;
    var classToRemove = !value ? classTrueValue : classFalseValue;
    if (element === null) {
      return;
    }
    if (element.classList.contains(classToRemove)) {
      element.classList.remove(classToRemove);
    }
    element.classList.add(classToAdd);
  }
 

  export function dispatchEmojis(){ 
    var evt = new CustomEvent('dispatchEmojis', {  });
    window.dispatchEvent(evt); 
  }

  window.dispatchEmojis=dispatchEmojis;

  export function reactElementRelocation(){
    $("#buttons-container").prepend($("#root button"));
  }

  export function getIndexesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
  }

  // PARSE Line breaks
  export function parseLineBreaks(comment){
    var comment = comment.split("\n").join("<br>");
    return comment;
  }

  // PARSE QUOTES (FAIL)
  export function parseCommentQuotes(comment) { 
    var quotesChar = comment.split(/^\>|&gt;/gm); // Matches to first > character in each line
    var quoting = false;

    if (quotesChar.length > 1) {
      var newcomment = "";
      for (var i = 0; i < quotesChar.length; i++) {
        if (quotesChar[i].length > 1) {
          if (quoting == false) {
            quoting = true;
            quotesChar[i] = "<span class='quote-marks'>" + quotesChar[i];
          }


          if (quotesChar[i].split("\n").length > 1) {
            var quotesParsed = quotesChar[i].split("\n");
            var newQuote = quotesParsed[0] + "</span>";

            for (var j = 1; j < quotesParsed.length; j++) {
              newQuote = newQuote + "<br>" + quotesParsed[j];
            }

            quoting = false;
            quotesChar[i] = newQuote;
          }

          newcomment = newcomment + quotesChar[i];
        }
      }
      comment = newcomment;
    } 
    return comment;
  }

  export function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
  }

  // Drag a window
  export function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt.querySelector(".header")) {
      // if present, the header is where you move the DIV from:
      elmnt.querySelector(".header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }