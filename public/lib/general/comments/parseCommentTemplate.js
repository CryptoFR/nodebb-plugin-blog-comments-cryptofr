import { set,pluginURL,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates } from "../../settings.js";
import { createNestedComments } from "./loadComments.js";

/**
 * Parses template
 * @param {Object} data the data to be put on the template
 * @returns {String} parsed template
 */
export function parse(data, template) {
  function replace(key, value, template) {
    var searchRegex = new RegExp("{" + key + "}", "g");
    return template.replace(searchRegex, value);
  }

  function makeRegex(block) {
    return new RegExp(
      "<!--[\\s]*BEGIN " +
        block +
        "[\\s]*-->[\\s\\S]*<!--[\\s]*END " +
        block +
        "[\\s]*-->",
      "g"
    );
  }

  function makeConditionalRegex(block) {
    return new RegExp(
      "<!--[\\s]*IF " +
        block +
        "[\\s]*-->([\\s\\S]*?)<!--[\\s]*ENDIF " +
        block +
        "[\\s]*-->",
      "g"
    );
  }

  function getBlock(regex, block, template) {
    data = template.match(regex);
    if (data == null) return;

    if (block !== undefined) templates.blocks[block] = data[0];

    var begin = new RegExp("(\r\n)*<!-- BEGIN " + block + " -->(\r\n)*", "g"),
      end = new RegExp("(\r\n)*<!-- END " + block + " -->(\r\n)*", "g"),
      data = data[0].replace(begin, "").replace(end, "");

    return data;
  }

  function setBlock(regex, block, template) {
    return template.replace(regex, block);
  }

  var regex, block;

  return (function parse(data, namespace, template, blockInfo) {
    if (!template) {
      return "";
    }
    if (!data || data.length == 0) {
      template = "";
    }
    function checkConditional(key, value) {
      var conditional = makeConditionalRegex(key),
        matches = template.match(conditional);

      if (matches !== null) {
        for (var i = 0, ii = matches.length; i < ii; i++) {
          var conditionalBlock = matches[i].split(/<!-- ELSE -->/);

          var statement = new RegExp(
            "(<!--[\\s]*IF " +
              key +
              "[\\s]*-->)|(<!--[\\s]*ENDIF " +
              key +
              "[\\s]*-->)",
            "gi"
          );

          if (conditionalBlock[1]) {
            // there is an else statement
            if (!value) {
              template = template.replace(
                matches[i],
                conditionalBlock[1].replace(statement, "")
              );
            } else {
              template = template.replace(
                matches[i],
                conditionalBlock[0].replace(statement, "")
              );
            }
          } else {
            // regular if statement
            if (!value) {
              template = template.replace(matches[i], "");
            } else {
              template = template.replace(
                matches[i],
                matches[i].replace(statement, "")
              );
            }
          }
        }
      }
    }

    for (var d in data) {
      if (data.hasOwnProperty(d)) {
        if (typeof data[d] === "undefined") {
          continue;
        } else if (data[d] === null) {
          template = replace(namespace + d, "", template);
        } else if (data[d].constructor == Array) {
          checkConditional(namespace + d + ".length", data[d].length);
          checkConditional("!" + namespace + d + ".length", !data[d].length);

          namespace += d + ".";

          var regex = makeRegex(d),
            block = getBlock(
              regex,
              namespace.substring(0, namespace.length - 1),
              template
            );

          if (block == null) {
            namespace = namespace.replace(d + ".", "");
            continue;
          }

          var numblocks = data[d].length - 1,
            i = 0,
            result = "";

          do {
            result += parse(data[d][i], namespace, block, {
              iterator: i,
              total: numblocks
            });
          } while (i++ < numblocks);

          namespace = namespace.replace(d + ".", "");
          template = setBlock(regex, result, template);
        } else if (data[d] instanceof Object) {
          template = parse(data[d], d + ".", template);
        } else {
          var key = namespace + d,
            value =
              typeof data[d] === "string"
                ? data[d].replace(/^\s+|\s+$/g, "")
                : data[d];

          checkConditional(key, value);
          checkConditional("!" + key, !value);

          if (blockInfo && blockInfo.iterator) {
            checkConditional("@first", blockInfo.iterator === 0);
            checkConditional("!@first", blockInfo.iterator !== 0);
            checkConditional("@last", blockInfo.iterator === blockInfo.total);
            checkConditional(
              "!@last",
              blockInfo.iterator !== blockInfo.total
            );
          }

          template = replace(key, value, template);
        }
      }
    }
    if (namespace) {
      var regex = new RegExp("{" + namespace + "[\\s\\S]*?}", "g");
      template = template.replace(regex, "");
      namespace = "";
    } else {
      // clean up all undefined conditionals
      template = template
        .replace(/<!-- ELSE -->/gi, "ENDIF -->")
        .replace(/<!-- IF([^@]*?)ENDIF([^@]*?)-->/gi, "");
    }
    var divPost = document.createElement("div");
    divPost.innerHTML = postTemplate;
    var div = document.createElement("div");
    div.innerHTML = template;
    if (data.hasOwnProperty("posts")) {
      // TODO try to use parse function again
      var nested = createNestedComments(
        data.posts,
        divPost.querySelector("li"),
        data
      );
      div.querySelector("#nodebb-comments-list").innerHTML = nested.innerHTML;
      template = div.innerHTML;
    }
    return template;
  })(data, "", template);
}
