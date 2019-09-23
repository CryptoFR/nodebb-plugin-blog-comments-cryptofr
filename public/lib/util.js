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


export function removeNodes(nodes) {
    var nodeList = nodes.length !== undefined ? nodes : [nodes];
    var len = nodeList.length;
    for (var i = 0; i < len; i++) {
      var node = nodeList[i];
      node.parentNode.removeChild(node);
    }
  }


  /**
   * Adds a loading div in the DOM
   */
export function addLoader() {
    if (document.querySelector("div.loading")) {
      return;
    }
    var div = document.createElement("div");
    div.classList.add("loading");
    document.querySelector("body").appendChild(div);
  }

  
  /**
   * Removes the loading div from the DOM
   */
export function removeLoader() {
    var div = document.querySelector("div.loading");
    removeNodes(div);
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