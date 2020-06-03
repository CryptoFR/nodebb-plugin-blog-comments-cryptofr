(function(module) {
  "use strict";

  var Comments = {};
  const { getNestedChildren, getNestedPosts, getPostsCategory } = require("./public/lib/src/helper");
  var db = require.main.require("./src/database"),
    meta = require.main.require("./src/meta"),
    posts = require.main.require("./src/posts"),
    topics = require.main.require("./src/topics"),
    user = require.main.require("./src/user"),
    groups = require.main.require("./src/groups"),
    privileges = require.main.require("./src/privileges"),
    fs = require.main.require("fs"),
    path = require.main.require("path"),
    async = require.main.require("async"),
    winston = require.main.require("winston");
  var simpleRecaptcha = require.main.require("simple-recaptcha-new");

  module.exports = Comments;
  function CORSSafeReq(req) {
    var hostUrls = (meta.config["blog-comments:url"] || "").split(","),
      url;

    hostUrls.forEach(function(hostUrl) {
      hostUrl = hostUrl.trim();
      if (hostUrl[hostUrl.length - 1] === "/") {
        hostUrl = hostUrl.substring(0, hostUrl.length - 1);
      }

      if (hostUrl === req.get("origin")) {
        url = req.get("origin");
      }
    });

    if (!url) {
      winston.warn(
        "[nodebb-plugin-blog-comments-cryptofr] Origin (" +
          req.get("origin") +
          ") does not match hostUrls: " +
          hostUrls.join(", ")
      );
    }
    return url;
  }

  function CORSFilter(req, res) {
    var url = CORSSafeReq(req);

    if (!url) {
      return;
    }

    res.header("Access-Control-Allow-Origin", url);
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    return res;
  }
  
  Comments.getToken = function (req, res) {
    return res.json({
      token: req.csrfToken()
    })
  }

  Comments.getTopicIDByCommentID = function(commentID, blogger, callback) {
    db.getObjectField("blog-comments:" + blogger, commentID, function(
      err,
      tid
    ) {
      callback(err, tid);
    });
  };
  Comments.getCommentData = function(req, res) {
    var commentID = req.params.id,
      blogger = req.params.blogger || "default",
      uid = req.user ? req.user.uid : 0;

    Comments.getTopicIDByCommentID(commentID, blogger, function(err, tid) {
      var disabled = false;

      async.parallel(
        {
          posts: async function getPosts() {
            if (disabled) {
              throw err;
            } else {
              return getNestedPosts(
                tid,
                uid,
                req.params.pagination || 0,
                req.params.sorting
              );
            }
          },
          postCount: function(next) {
            topics.getTopicField(tid, "postcount", next);
          },
          user: function(next) {
            user.getUserData(uid, next);
          },
          isAdministrator: function(next) {
            user.isAdministrator(uid, next);
          },
          isPublisher: function(next) {
            groups.isMember(uid, "publishers", next);
          },
          category: function(next) {
            topics.getCategoryData(tid, next);
          },
          mainPost: function(next) {
            topics.getMainPost(tid, uid, next);
          }
        },
        function(err, data) {
          CORSFilter(req, res);

          var top = true;
          var bottom = false;
          var compose_location = meta.config["blog-comments:compose-location"];
          if (compose_location == "bottom") {
            bottom = true;
            top = false;
          }


          res.json({
            posts: data.posts.data,
            isLastPage: data.posts.isLastPage,
            postCount: data.postCount - 1,
            user: data.user,
            template: Comments.template,
            singleCommentTpl: Comments.singleCommentTpl,
            loginModalTemplate: Comments.loginModalTemplate,
            registerModalTemplate: Comments.registerModalTemplate,
            token: req.csrfToken(),
            isAdmin: !data.isAdministrator
              ? data.isPublisher
              : data.isAdministrator,
            isLoggedIn: !!uid,
            tid: tid,
            category: data.category,
            mainPost: data.mainPost,
            isValid: !!data.mainPost && !!tid,
            atBottom: bottom,
            atTop: top,
            siteTitle: meta.config.title,
            sorting: req.params.sorting,
            userHasPicture: !!data.user.picture,
            forumUrl: "https://testforum.cryptofr.com",
            timestamp: Date.now()
          });
        }
      );
    });
  };


  Comments.getAllCommentsData = function(req, res) {
    var commentIDs = req.params.ids.split("-"),
      blogger = req.params.blogger || "default",
      uid = req.user ? req.user.uid : 0;

    let responses=[]
    
    for (let commentID of commentIDs){
      Comments.getTopicIDByCommentID(commentID, blogger, function(err, tid) {
        var disabled = false;

        async.parallel(
          {
            posts: async function getPosts() {
              if (disabled) {
                throw err;
              } else {
                return getNestedPosts(
                  tid,
                  uid,
                  req.params.pagination || 0,
                  req.params.sorting
                );
              }
            },
            postCount: function(next) {
              topics.getTopicField(tid, "postcount", next);
            },
            user: function(next) {
              user.getUserData(uid, next);
            },
            isAdministrator: function(next) {
              user.isAdministrator(uid, next);
            },
            isPublisher: function(next) {
              groups.isMember(uid, "publishers", next);
            },
            category: function(next) {
              topics.getCategoryData(tid, next);
            },
            mainPost: function(next) {
              topics.getMainPost(tid, uid, next);
            }
          },
          function(err, data) {
            CORSFilter(req, res);

            var top = true;
            var bottom = false;
            var compose_location = meta.config["blog-comments:compose-location"];
            if (compose_location == "bottom") {
              bottom = true;
              top = false;
            }
            console.log( 'data.posts',data.posts)
            responses.push({
              posts: data.posts.data,
              isLastPage: data.posts.isLastPage,
              postCount: data.postCount - 1,
              user: data.user,
              template: Comments.template,
              singleCommentTpl: Comments.singleCommentTpl,
              loginModalTemplate: Comments.loginModalTemplate,
              registerModalTemplate: Comments.registerModalTemplate,
              token: req.csrfToken(),
              isAdmin: !data.isAdministrator
                ? data.isPublisher
                : data.isAdministrator,
              isLoggedIn: !!uid,
              tid: tid,
              category: data.category,
              mainPost: data.mainPost,
              isValid: !!data.mainPost && !!tid,
              atBottom: bottom,
              atTop: top,
              siteTitle: meta.config.title,
              sorting: req.params.sorting,
              userHasPicture: !!data.user.picture,
              forumUrl: "https://testforum.cryptofr.com",
            })

          }
        );
      });
    }
    res.json(responses);
  };

  function get_redirect_url(url, err) {
    var rurl = url + "#nodebb-comments";
    if (url.indexOf("#") !== -1) {
      // compatible for mmmw's blog, he uses hash in url;
      rurl = url;
    }

    if (err) {
      rurl = url + "?error=" + err.message + "#nodebb-comments";
      if (url.indexOf("#") !== -1) {
        rurl =
          url.split("#")[0] + "?error=" + err.message + "#" + url.split("#")[1];
      }
    }
    return rurl;
  }

  Comments.votePost = function(req, res, callback) {
    if (!CORSSafeReq(req)) {
      return;
    }
    var toPid = req.body.toPid,
      isUpvote = JSON.parse(req.body.isUpvote),
      uid = req.user ? req.user.uid : 0;
    const fn = isUpvote ? "upvote" : "unvote";
    posts[fn](toPid, uid, function(err, result) {
      CORSFilter(req, res);
      res.json({ error: err && err.message, result: result });
    });
  };

  Comments.downvotePost = function(req, res, callback) {
    if (!CORSSafeReq(req)) {
      return;
    }
    var toPid = req.body.toPid,
      isDownvote = JSON.parse(req.body.isDownvote),
      uid = req.user ? req.user.uid : 0;
    const fn = isDownvote ? "downvote" : "unvote";
    posts[fn](toPid, uid, function(err, result) {
      CORSFilter(req, res);
      res.json({ error: err && err.message, result: result });
    });
  };

  Comments.bookmarkPost = function(req, res, callback) {
    if (!CORSSafeReq(req)) {
      return;
    }
    var toPid = req.body.toPid,
      isBookmark = JSON.parse(req.body.isBookmark),
      uid = req.user ? req.user.uid : 0;

    var func = isBookmark ? "bookmark" : "unbookmark";

    posts[func](toPid, uid, function(err, result) {
      CORSFilter(req, res);
      res.json({ error: err && err.message, result: result });
    });
  };

  const replyTopic = (tid, uid, toPid, content) => new Promise((resolve, reject) => {
    console.log('content',content)
    topics.reply(
      {
        tid: tid,
        uid: uid,
        toPid: toPid,
        content: content
      }, function cb(err, postData) {
        if (err) {
          reject(err)
        } else {
          resolve(postData)
        }
      })
  });

  const getUserOfPid = (toPid) => new Promise((resolve, reject) => {
    if (!toPid) {
      return resolve(null)
    }
    posts.getPostField(toPid, 'uid', function (err, uid) {
      if (err) {
        return reject(err)
      }
      user.getUserData(uid, function (err, user) {
        if (err) {
          return reject(err)
        }
        resolve(user)
      })
    })
  });

  Comments.replyToComment = async function(req, res, callback) {
    var content = req.body.content,
      tid = req.body.tid,
      url = req.body.url,
      toPid = req.body.toPid,
      uid = req.user ? req.user.uid : 0;
    const postData = await replyTopic(tid, uid, toPid, content)
    return res.json({
      tid,
      uid,
      toPid,
      content,
      pid: postData.pid,
      user: postData.user,
      parentUser: await getUserOfPid(toPid)
    })
  };
  Comments.editPost = function(req, res) {
    const { pid } = req.params;
    const content = req.body.content,
      url = req.body.url,
      uid = req.user ? req.user.uid : 0;
    posts.edit(
      {
        uid,
        content,
        pid,
        req
      },
      function(err, postData) {
        return res.json({
          uid,
          content,
          pid: postData.pid,
          user: postData.user
        });
      }
    );
  };
  Comments.publishArticle = function(req, res, callback) {
    var markdown = req.body.markdown,
      title = req.body.title,
      url = req.body.url,
      commentID = req.body.id,
      tags = req.body.tags,
      blogger = req.body.blogger || "default",
      uid = req.user ? req.user.uid : 0,
      cid = JSON.parse(req.body.cid);

    if (cid === -1) {
      var hostUrls = (meta.config["blog-comments:url"] || "").split(","),
        position = 0;

      hostUrls.forEach(function(hostUrl, i) {
        hostUrl = hostUrl.trim();
        if (hostUrl[hostUrl.length - 1] === "/") {
          hostUrl = hostUrl.substring(0, hostUrl.length - 1);
        }

        if (hostUrl === req.get("origin")) {
          position = i;
        }
      });

      cid = meta.config["blog-comments:cid"].toString() || "";
      cid =
        parseInt(cid.split(",")[position], 10) ||
        parseInt(cid.split(",")[0], 10) ||
        1;
    }

    async.parallel(
      {
        isAdministrator: function(next) {
          user.isAdministrator(uid, next);
        },
        isPublisher: function(next) {
          groups.isMember(uid, "publishers", next);
        }
      },
      function(err, userStatus) {
        if (!userStatus.isAdministrator && !userStatus.isPublisher) {
          return res.json({
            error:
              "Only Administrators or members of the publishers group can publish articles"
          });
        }

        topics.post(
          {
            uid: uid,
            title: title,
            content: markdown,
            tags: tags ? JSON.parse(tags) : [],
            req: req,
            externalLink: url, // save externalLink and externalComment to topic, only v2mm theme can do this.
            externalComment: markdown,
            cid: cid
          },
          function(err, result) {
            if (!err && result && result.postData && result.postData.tid) {
              posts.setPostField(
                result.postData.pid,
                "blog-comments:url",
                url,
                function(err) {
                  if (err) {
                    return res.json({
                      error: "Unable to post topic",
                      result: result
                    });
                  }

                  db.setObjectField(
                    "blog-comments:" + blogger,
                    commentID,
                    result.postData.tid
                  );
                  var rurl =
                    (req.header("Referer") || "/") + "#nodebb-comments";
                  if (url.indexOf("#") !== -1) {
                    // compatible for mmmw's blog, he uses hash in url;
                    rurl = url;
                  }

                  res.redirect(rurl);
                }
              );
            } else {
              res.json({ error: "Unable to post topic", result: result });
            }
          }
        );
      }
    );
  };

  Comments.getAllArticlesCategory = async function (req, res) {
    const { categoryId } = req.params
    const sorting = req.params.sorting || 'best'
    const uid = req.user ? req.user.uid : 0;
    try {
      const isAdminOrMod = await privileges.categories.isAdminOrMod(categoryId, uid)
      if (!isAdminOrMod) {
        return res.status(403).json({
          error: true,
          message: 'Not authorized'
        });
      }
      const u = await user.getUserData(uid);
      const isAdministrator = await user.isAdministrator(uid);
      const groupData = await groups.getUserGroups([uid])
      u.groupData = groupData
      u.isAdminOrMod = isAdminOrMod
      const posts = await getPostsCategory(categoryId, uid, sorting)
      return res.json({user: u, isAdministrator, posts})
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: true,
        message: err.message
      })
    }
    
  }

  Comments.getNewComments = function(req, res) {
    const timestamp = parseInt(req.params.timestamp, 10);
    const tid = req.params.tid
    const uid = req.user ? req.user.uid : 0;
    const serverTimestamp = Date.now();
    return db.getSortedSetRangeByScoreWithScores(`tid:${tid}:posts`, 0, -1, timestamp, '+inf', function(err, unfilteredPids) {
      const pids = unfilteredPids.map(r => r.value);
      posts.getPostsData(pids, function (err, postsData) {
        topics.addPostData(postsData, uid, function (err, postsData) {
          return res.json({postsData,timestamp: serverTimestamp}) 
        })
      })
    })
  }

  Comments.addLinkbackToArticle = function(post, callback) {
    var hostUrls = (meta.config["blog-comments:url"] || "").split(","),
      position;

    posts.getPostField(post.pid, "blog-comments:url", function(err, url) {
      if (url) {
        hostUrls.forEach(function(hostUrl, i) {
          if (url.indexOf(hostUrl.trim().replace(/^https?:\/\//, "")) !== -1) {
            position = i;
          }
        });

        var blogName = meta.config["blog-comments:name"] || "";
        blogName =
          parseInt(blogName.split(",")[position], 10) ||
          parseInt(blogName.split(",")[0], 10) ||
          1;

        post.profile.push({
          content:
            "Posted from <strong><a href=" +
            url +
            " target='blank'>" +
            blogName +
            "</a></strong>"
        });
      }

      callback(err, post);
    });
  };

  Comments.deletePost = async function (req, res) {
    const uid = req.user ? req.user.uid : 0;
    const pid = req.params.pid;
    await posts.delete(pid, uid)
    return res.json({deleted: true, uid, pid})
  }

  Comments.addAdminLink = function(custom_header, callback) {
    custom_header.plugins.push({
      route: "/blog-comments",
      icon: "fa-book",
      name: "Blog Comments"
    });

    callback(null, custom_header);
  };

  function renderAdmin(req, res, callback) {
    res.render("admin/admin", {});
  }


  function captchaMiddleware(req, res, next) {
    const privateKey = meta.config["blog-comments:captcha-api-key"]; // your private key here
    const ip = req.ip; // this is an optional parameter
    const response = req.body.captcha;
    simpleRecaptcha(privateKey, ip, response, function(err) {
      if (err)
        return res.status(500).send({
          error: err.message,
          results: {}
        });
      return next();
    });
  }

  function register(req, res) {
    if (req.body.terms) {
      return user.create(req.body, function userCreateCb(err, uid) {
        // TODO Add status for user endpoint
        const error = err && err.message;
        return res.status(error ? 403 : 200).json({
          error,
          results: {
            uid
          }
        });
      });
    } else {
      return res.json({
        error: "Terms are not accepted",
        results: {}
      });
    }
  }

  function userExists(req, res) {
    const { username } = req.query;
    if (username) {
      return user.existsBySlug(username, function cb(err, exists) {
        const error = err && err.message;
        return res.status(error ? 403 : 200).json({
          error,
          results: {
            exists
          }
        });
      });
    } else {
      return res.json({
        error: null,
        results: {
          exists: true
        }
      });
    }
  }

  function emailExists(req, res) {
    const { email } = req.query;
    if (email) {
      return user.email.available(email, function cb(err, available) {
        const error = err && err.message;
        return res.status(error ? 403 : 200).json({
          error,
          results: {
            available
          }
        });
      });
    } else {
      return res.json({
        error: null,
        results: {
          available: true
        }
      });
    }
  }
  Comments.init = function(params, callback) {
    var app = params.router,
      middleware = params.middleware,
      controllers = params.controllers;

    const registerTemplate = (fileName, folder, key) =>
      fs.readFile(
        path.resolve(__dirname, `./public/templates/${folder}/${fileName}.tpl`),
        function(err, data) {
          Comments[key] = data.toString();
        }
      );
    registerTemplate("comments", "comments", "template");
    registerTemplate("single", "comments","singleCommentTpl");
    registerTemplate("loginModal","modal", "loginModalTemplate");
    registerTemplate("registerModal","modal", "registerModalTemplate");
    // TODO Apply CSRF to everything
    app.get(
      "/comments/get/:blogger/:id/:pagination(\\d+)?/:sorting(oldest|newest|best)?",
      middleware.applyCSRF,
      Comments.getCommentData
    );
    app.get("/comments/getAll/:blogger/:ids/",middleware.applyCSRF,Comments.getAllCommentsData);
    app.post("/comments/plugin/register", captchaMiddleware, register);
    app.post("/comments/reply", Comments.replyToComment);
    app.post("/comments/publish", Comments.publishArticle);
    app.post("/comments/vote", Comments.votePost);
    app.post("/comments/downvote", Comments.downvotePost);
    app.post("/comments/bookmark", Comments.bookmarkPost);
    app.post("/comments/edit/:pid", Comments.editPost);
    app.get("/comments/plugin/email", emailExists);
    app.get("/comments/plugin/username", userExists);

    app.get("/admin/blog-comments", middleware.admin.buildHeader, renderAdmin);
    app.get("/api/admin/blog-comments", renderAdmin);
    app.post("/comments/delete/:pid", Comments.deletePost);
    app.get('/comments/token', middleware.applyCSRF, Comments.getToken);
    app.get('/comments/new/:tid/:timestamp', middleware.applyCSRF, Comments.getNewComments)
    app.get('/comments/bycid/:categoryId/:sorting(oldest|newest|best)?', middleware.applyCSRF, Comments.getAllArticlesCategory);
    callback();
  };
})(module);
