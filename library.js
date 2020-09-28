(function (module) {
  'use strict';

  var Comments = {};
  const { 
    getNestedPosts, 
    getPostsCategory, 
    getObjectTopic, 
    attachTopics, 
    attachSingleTopic, 
    replyTopic, 
    checkTopicInRSSMiddleware, 
    getModerationQueue, 
    approvePost, 
    rejectPost,
  } = require('./helper');
  var db = require.main.require('./src/database'),
    meta = require.main.require('./src/meta'),
    posts = require.main.require('./src/posts'),
    topics = require.main.require('./src/topics'),
    user = require.main.require('./src/user'),
    groups = require.main.require('./src/groups'),
    privileges = require.main.require('./src/privileges'),
    fs = require.main.require('fs'),
    path = require.main.require('path'),
    async = require.main.require('async'),
    winston = require.main.require('winston');
  var simpleRecaptcha = require.main.require('simple-recaptcha-new');
  const {turndownService} = require("./turndown");
  module.exports = Comments;
  const {localLogin, passport, loggedOrGuestMiddleware} = require('./login');
  const {importData} = require('./comment_importer');
  const passportMiddleware = passport.authenticate(['jwt']);

  const moveTopic = async function(req, res) {
    const { tid, newCid } = req.body;
    const { uid } = req.user;
    try {
      const currentCid = await db.getObjectField(`topic:${tid}`, 'cid');
      await topics.tools.move(tid, { cid: newCid, uid, tids: [tid], currentCid });
      return res.status(200).json({
        ok: true,
        message: 'Topic moved'
      });
    } catch (err) {
      return res.status(500).json({ error: err.message, ok: false });
    }
  }

  const isLoggedIn = req => req.user && parseInt(req.user.uid, 10) > 0;

  function CORSSafeReq(req) {
    var hostUrls = (meta.config['blog-comments:url'] || '').split(','),
      url;

    hostUrls.forEach(function (hostUrl) {
      hostUrl = hostUrl.trim();
      if (hostUrl[hostUrl.length - 1] === '/') {
        hostUrl = hostUrl.substring(0, hostUrl.length - 1);
      }

      if (hostUrl === req.get('origin')) {
        url = req.get('origin');
      }
    });

    if (!url) {
      winston.warn('[nodebb-plugin-blog-comments-cryptofr] Origin (' + req.get('origin') + ') does not match hostUrls: ' + hostUrls.join(', '));
    }
    return url;
  }

  function CORSFilter(req, res) {
    var url = CORSSafeReq(req);

    if (!url) {
      return;
    }

    res.header('Access-Control-Allow-Origin', url);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res;
  }

  Comments.getToken = function (req, res) {
    return res.json({
      token: req.csrfToken(),
      uid: req.user ? req.user.uid : 0,
    });
  };


  Comments.getTopicIDByCommentID = function (commentID, blogger, callback) {
    db.getObjectField('blog-comments:' + blogger, commentID, function (err, tid) {
      callback(err, tid);
    });
  };
  Comments.getPostCount = async function (req, res) {
    const { query } = req.query;
    const t = await Promise.all(
      query.map(async ({ blogger, id }) => {
        const tid = await db.getObjectField(`blog-comments:${blogger}`, id);
        const count = await topics.getTopicField(tid, 'postcount');
        return { articleID: id, tid, count };
      })
    );
    return res.json(t);
  };
  Comments.test = function (req, res) {
    console.log(req.files);
  };
  Comments.getCommentData = function (req, res) {
    var commentID = req.params.id,
      blogger = req.params.blogger || 'default',
      uid = req.user ? req.user.uid : 0;

    Comments.getTopicIDByCommentID(commentID, blogger, function (err, tid) {
      var disabled = false;

      async.parallel(
        {
          posts: async function getPosts() {
            if (disabled) {
              throw err;
            } else {
              return getNestedPosts(tid, uid, req.params.pagination || 0, req.params.sorting);
            }
          },
          postCount: function (next) {
            topics.getTopicField(tid, 'postcount', next);
          },
          user: function (next) {
            user.getUserData(uid, next);
          },
          isAdministrator: function (next) {
            user.isAdministrator(uid, next);
          },
          isPublisher: function (next) {
            groups.isMember(uid, 'publishers', next);
          },
          category: function (next) {
            topics.getCategoryData(tid, next);
          },
          mainPost: function (next) {
            topics.getMainPost(tid, uid, next);
          },
        },
        function (err, data) {
          CORSFilter(req, res);

          var top = true;
          var bottom = false;
          var compose_location = meta.config['blog-comments:compose-location'];
          if (compose_location == 'bottom') {
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
            isAdmin: !data.isAdministrator ? data.isPublisher : data.isAdministrator,
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
            forumUrl: 'https://testforum.cryptofr.com',
            timestamp: Date.now(),
          });
        }
      );
    });
  };

  Comments.getAllCommentsData = function (req, res) {
    var commentIDs = req.params.ids.split('-'),
      blogger = req.params.blogger || 'default',
      uid = req.user ? req.user.uid : 0;

    let responses = [];

    for (let commentID of commentIDs) {
      Comments.getTopicIDByCommentID(commentID, blogger, function (err, tid) {
        var disabled = false;

        async.parallel(
          {
            posts: async function getPosts() {
              if (disabled) {
                throw err;
              } else {
                return getNestedPosts(tid, uid, req.params.pagination || 0, req.params.sorting);
              }
            },
            postCount: function (next) {
              topics.getTopicField(tid, 'postcount', next);
            },
            user: function (next) {
              user.getUserData(uid, next);
            },
            isAdministrator: function (next) {
              user.isAdministrator(uid, next);
            },
            isPublisher: function (next) {
              groups.isMember(uid, 'publishers', next);
            },
            category: function (next) {
              topics.getCategoryData(tid, next);
            },
            mainPost: function (next) {
              topics.getMainPost(tid, uid, next);
            },
          },
          function (err, data) {
            CORSFilter(req, res);

            var top = true;
            var bottom = false;
            var compose_location = meta.config['blog-comments:compose-location'];
            if (compose_location == 'bottom') {
              bottom = true;
              top = false;
            }
            console.log('data.posts', data.posts);
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
              isAdmin: !data.isAdministrator ? data.isPublisher : data.isAdministrator,
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
              forumUrl: 'https://testforum.cryptofr.com',
            });
          }
        );
      });
    }
    res.json(responses);
  };

  function get_redirect_url(url, err) {
    var rurl = url + '#nodebb-comments';
    if (url.indexOf('#') !== -1) {
      // compatible for mmmw's blog, he uses hash in url;
      rurl = url;
    }

    if (err) {
      rurl = url + '?error=' + err.message + '#nodebb-comments';
      if (url.indexOf('#') !== -1) {
        rurl = url.split('#')[0] + '?error=' + err.message + '#' + url.split('#')[1];
      }
    }
    return rurl;
  }

  Comments.votePost = function (req, res, callback) {
    if (!CORSSafeReq(req)) {
      return;
    }
    var toPid = req.body.toPid,
      isUpvote = JSON.parse(req.body.isUpvote),
      uid = req.user ? req.user.uid : 0;
    const fn = isUpvote ? 'upvote' : 'unvote';
    posts[fn](toPid, uid, function (err, result) {
      CORSFilter(req, res);
      res.json({ error: err && err.message, result: result });
    });
  };

  Comments.downvotePost = function (req, res, callback) {
    if (!CORSSafeReq(req)) {
      return;
    }
    var toPid = req.body.toPid,
      isDownvote = JSON.parse(req.body.isDownvote),
      uid = req.user ? req.user.uid : 0;
    const fn = isDownvote ? 'downvote' : 'unvote';
    posts[fn](toPid, uid, function (err, result) {
      CORSFilter(req, res);
      res.json({ error: err && err.message, result: result });
    });
  };

  Comments.bookmarkPost = function (req, res, callback) {
    if (!CORSSafeReq(req)) {
      return;
    }
    var toPid = req.body.toPid,
      isBookmark = JSON.parse(req.body.isBookmark),
      uid = req.user ? req.user.uid : 0;

    var func = isBookmark ? 'bookmark' : 'unbookmark';

    posts[func](toPid, uid, function (err, result) {
      CORSFilter(req, res);
      res.json({ error: err && err.message, result: result });
    });
  };

  const getUserOfPid = toPid =>
    new Promise((resolve, reject) => {
      if (!toPid) {
        return resolve(null);
      }
      posts.getPostField(toPid, 'uid', function (err, uid) {
        if (err) {
          return reject(err);
        }
        user.getUserData(uid, function (err, user) {
          if (err) {
            return reject(err);
          }
          resolve(user);
        });
      });
    });

  Comments.replyToComment = async function (req, res, callback) {
    var content = req.body.content,
      tid = req.body.tid,
      url = req.body.url,
      toPid = req.body.toPid,
      uid = req.user ? req.user.uid : 0;
    var name = undefined;
    if (uid === 0) {
      name = req.body.name;
      if (name.length < 2)
        return res.status(403).json({
          error: true,
          message: 'Guest must have a Valid Username',
        });
    }
    const postData = await replyTopic(tid, uid, toPid, content, name);
    if (uid === 0) {
      console.log('posdata', postData);
      // Delete comments if it's guests
      await posts.delete(postData.pid, 0);
      // We add here data to then moderation queues of the plugin
      await db.sortedSetAdd(`queue_mod:${tid}:pids`, postData.timestamp, postData.pid);
      await db.setAdd("queue_mod:tids", tid);
    }
    return res.json({
      tid,
      uid,
      toPid,
      content,
      pid: postData.pid,
      user: postData.user,
      parentUser: await getUserOfPid(toPid),
    });
  };
  Comments.editPost = function (req, res) {
    const { pid } = req.params;
    const content = req.body.content,
      url = req.body.url,
      uid = req.user ? req.user.uid : 0;
    if (uid === 0)
      return res.status(403).json({
        error: true,
        message: 'Only Administrators or owner of comments may Edit Comments',
      });

    posts.edit(
      {
        uid,
        content,
        pid,
        req,
      },
      function (err, postData) {
        return res.json({
          uid,
          content,
          pid: postData.pid,
          user: postData.user,
        });
      }
    );
  };
  Comments.publishBatchArticles = function (req, res) {
    var uid = req.user ? req.user.uid : 0,
      cid = JSON.parse(req.body.cid);
    if (cid === -1) {
      var hostUrls = (meta.config['blog-comments:url'] || '').split(','),
        position = 0;

      hostUrls.forEach(function (hostUrl, i) {
        hostUrl = hostUrl.trim();
        if (hostUrl[hostUrl.length - 1] === '/') {
          hostUrl = hostUrl.substring(0, hostUrl.length - 1);
        }

        if (hostUrl === req.get('origin')) {
          position = i;
        }
      });

      cid = meta.config['blog-comments:cid'].toString() || '';
      cid = parseInt(cid.split(',')[position], 10) || parseInt(cid.split(',')[0], 10) || 1;
    }
    async.parallel(
      {
        isAdministrator: function (next) {
          user.isAdministrator(uid, next);
        },
        isPublisher: function (next) {
          groups.isMember(uid, 'publishers', next);
        },
        isModerator: function (next) {
          user.isModerator(uid, [cid], next);
        },
      },
      async function (err, userStatus) {
        if (!userStatus.isAdministrator && !userStatus.isPublisher && !userStatus.isModerator[0]) {
          return res.status(403).json({
            error: true,
            message: 'Only Administrators or moderators or members of the publishers group can publish articles',
          });
        }
        const ids = [];
        const promises = req.body.posts.map(async ({ title, markdown, tags, url, id, blogger }) => {
          const data = await topics.post({
            uid,
            title,
            content: turndownService.turndown(markdown),
            tags: tags ? JSON.parse(tags) : [],
            cid,
            externalComment: markdown,
            externalLink: url,
          });
          await posts.setPostField(data.postData.pid, 'blog-comments:url', url);
          await db.setObjectField(`topic:${data.postData.tid}`, 'externalLink', url);
          await db.setObjectField('blog-comments:' + blogger, id, data.postData.tid);
          ids.push(id);
        });
        try {
          await Promise.all(promises);
          return res.json({ ok: true, ids });
        } catch (err) {
          return res.status(500).json({
            error: true,
            message: err.message,
            ids,
          });
        }
      }
    );
  };
  Comments.publishArticle = function (req, res, callback) {
    var markdown = req.body.markdown,
      title = req.body.title,
      url = req.body.url,
      commentID = req.body.id,
      tags = req.body.tags,
      blogger = req.body.blogger || 'default',
      uid = req.user ? req.user.uid : 0,
      cid = JSON.parse(req.body.cid);

    if (cid === -1) {
      var hostUrls = (meta.config['blog-comments:url'] || '').split(','),
        position = 0;

      hostUrls.forEach(function (hostUrl, i) {
        hostUrl = hostUrl.trim();
        if (hostUrl[hostUrl.length - 1] === '/') {
          hostUrl = hostUrl.substring(0, hostUrl.length - 1);
        }

        if (hostUrl === req.get('origin')) {
          position = i;
        }
      });

      cid = meta.config['blog-comments:cid'].toString() || '';
      cid = parseInt(cid.split(',')[position], 10) || parseInt(cid.split(',')[0], 10) || 1;
    }

    async.parallel(
      {
        isAdministrator: function (next) {
          user.isAdministrator(uid, next);
        },
        isPublisher: function (next) {
          groups.isMember(uid, 'publishers', next);
        },
        isModerator: function (next) {
          user.isModerator(uid, [cid], next);
        },
      },
      function (err, userStatus) {
        if (!userStatus.isAdministrator && !userStatus.isPublisher && !userStatus.isModerator[0]) {
          return res.status(403).json({
            error: 'Only Administrators or moderators or members of the publishers group can publish articles',
          });
        }

        topics.post(
          {
            uid: uid,
            title: title,
            content: turndownService.turndown(markdown),
            tags: tags ? JSON.parse(tags) : [],
            req: req,
            externalLink: url, // save externalLink and externalComment to topic, only v2mm theme can do this.
            externalComment: markdown,
            cid: cid,
          },
          function (err, result) {
            if (!err && result && result.postData && result.postData.tid) {
              posts.setPostField(result.postData.pid, 'blog-comments:url', url, function (err) {
                if (err) {
                  return res.status(403).json({
                    ok: false,
                    error: 'Unable to post topic',
                    result: result,
                  });
                }
                db.setObjectField(`topic:${result.postData.tid}`, 'externalLink', url);
                db.setObjectField('blog-comments:' + blogger, commentID, result.postData.tid);
                const feedUrl = "https://testblog.roisdigital.com/feed"; // TODO Change this
                db.sortedSetAdd(`nodebb-plugin-rss:feed:${feedUrl}:uuid`,result.postData.tid, url)
                var rurl = (req.header('Referer') || '/') + '#nodebb-comments';
                if (url.indexOf('#') !== -1) {
                  // compatible for mmmw's blog, he uses hash in url;
                  rurl = url;
                }
                res.json({ ok: true, message: "Topic posted" });
              });
            } else {
              res.status(403).json({ ok: false, error: 'Unable to post topic', result: result });
            }
          }
        );
      }
    );
  };

  Comments.getAllArticlesCategory = async function (req, res) {
    const uid = req.user ? req.user.uid : 0;
    if (uid === 0) {
      return res.status(401).json({
        error: true,
        message: 'Not connected',
      });
    }
    const { categoryId } = req.params;
    const sorting = req.params.sorting || 'best';
    try {
      const isAdminOrMod = await privileges.categories.isAdminOrMod(categoryId, uid);
      const u = await user.getUserData(uid);
      const isAdministrator = await user.isAdministrator(uid);
      const groupData = await groups.getUserGroups([uid]);
      u.groupData = groupData;
      u.isAdminOrMod = isAdminOrMod;
      if (!isAdminOrMod) {
        return res.status(403).json({
          error: true,
          message: 'Not authorized',
          user: u,
        });
      }
      const pagination = req.query.pagination ? req.query.pagination : 0
      const postsData = await getPostsCategory(categoryId, uid, sorting, pagination);
      return res.json({ user: u, isAdministrator, posts: postsData.data, isLastPage: postsData.isLastPage });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }
  };

  Comments.getNewComments = async function (req, res) {
    const timestamp = parseInt(req.params.timestamp, 10);
    const tid = req.params.tid;
    const uid = req.user ? req.user.uid : 0;
    const serverTimestamp = Date.now();
    const unfilteredPids = await db.getSortedSetRangeByScoreWithScores(`tid:${tid}:posts`, 0, -1, timestamp, '+inf');
    const pids = unfilteredPids.map(r => r.value);
    const postsData = await posts.getPostsData(pids);
    const topicAddedPostData = await topics.addPostData(postsData, uid);
    const count = await topics.getTopicField(tid, 'postcount');
    return res.json({ postsData: topicAddedPostData, timestamp: serverTimestamp, count });
  };

  Comments.addLinkbackToArticle = function (post, callback) {
    var hostUrls = (meta.config['blog-comments:url'] || '').split(','),
      position;

    posts.getPostField(post.pid, 'blog-comments:url', function (err, url) {
      if (url) {
        hostUrls.forEach(function (hostUrl, i) {
          if (url.indexOf(hostUrl.trim().replace(/^https?:\/\//, '')) !== -1) {
            position = i;
          }
        });

        var blogName = meta.config['blog-comments:name'] || '';
        blogName = parseInt(blogName.split(',')[position], 10) || parseInt(blogName.split(',')[0], 10) || 1;

        post.profile.push({
          content: 'Posted from <strong><a href=' + url + " target='blank'>" + blogName + '</a></strong>',
        });
      }

      callback(err, post);
    });
  };

  Comments.deletePost = async function (req, res) {
    const uid = req.user ? req.user.uid : 0;

    if (uid === 0)
      return res.status(403).json({
        error: 'Only Administrators, moderators or owner of comments may Delete Comments',
      });

    const pid = req.params.pid;
    await posts.delete(pid, uid);
    return res.json({ deleted: true, uid, pid });
  };

  Comments.addAdminLink = function (custom_header, callback) {
    custom_header.plugins.push({
      route: '/blog-comments',
      icon: 'fa-book',
      name: 'Blog Comments',
    });

    callback(null, custom_header);
  };

  function renderAdmin(req, res, callback) {
    res.render("admin/admin", {});
  }

  function wrapperCaptchaMiddleware(req, res, next) {
    const uid = req.user ? req.user.uid : 0;
    if (uid === 0) {
      return captchaMiddleware(req, res, next)
    } else {
      return next();
    }
  }

  function checkGuestUsername(req, res, next) {
    const { name } = req.body;
    if (isLoggedIn(req)) {
      return next();
    } else if (typeof name !== 'string' || name.trim() === '') {
      return res.status(422).json({
        error: 'Invalid name',
        results: {}
      });
    } else {
      return user.existsBySlug(name, function cb(err, exists) {
        if (err) {
          winston.warn('There was an error checking guest username', err);
          return res.status(500).json({
            error: err.message,
            results: {}
          });
        }
        if (exists) {
          return res.status(422).json({
            error: 'Duplicated name',
            results: {}
          });
        } else {
          return next();
        }
      })
    }
  }


  function captchaMiddleware(req, res, next) {
    const privateKey = meta.config['blog-comments:captcha-api-key']; // your private key here
    const ip = req.ip; // this is an optional parameter
    const response = req.body.captcha;
    simpleRecaptcha(privateKey, ip, response, function (err) {
      if (err)
        return res.status(403).send({
          error: err.message,
          results: {},
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
            uid,
          },
        });
      });
    } else {
      return res.json({
        error: 'Terms are not accepted',
        results: {},
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
            exists,
          },
        });
      });
    } else {
      return res.json({
        error: null,
        results: {
          exists: true,
        },
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
            available,
          },
        });
      });
    } else {
      return res.json({
        error: null,
        results: {
          available: true,
        },
      });
    }
  }


  function loggedInMiddleware(req, res, next) {
    if (isLoggedIn(req)) {
      return next();
    } else {
      return res.status(403).json({
        error: 'Not logged in',
        results: {}
      });
    }
  }
  function categoryZeroMiddleware(req, res, next) {
    const { cid } = req.params;
    if (!cid || cid <= 0) {
      return res.status(422).json({
        ok: false,
        message: 'Invalid category'
      });
    }
    return next();
  }

  async function moderatorCategoryMiddleware(req, res, next) {
    const { cid } = req.params;
    const uid = req.user ? req.user.uid : 0;
    const isModerator = await user.isModerator(uid, cid);
    if (!isModerator) {
      return res.status(422).json({
        ok: false,
        message: 'You are not a moderator'
      })
    }
    return next();
  }

  async function isAdminOrModMiddleware(req, res, next) {
    const uid = req.user ? req.user.uid : 0;
    const tid = await posts.getPostField(req.params.pid, 'tid');
    const cid = await topics.getTopicField(tid, 'cid');
    const [isAdministrator, isModerator] = await Promise.all([
      user.isAdministrator(uid),
      user.isModerator(uid, cid)
    ]);
    console.log('isAdministrator', isAdministrator, 'isModerator', isModerator);
    if (!isAdministrator && !isModerator) {
      return res.status(403).json({
        ok: false,
        error: 'You are not a moderator or administrator'
      });
    }
    return next();
  }

  Comments.init = function (params, callback) {
    var app = params.router,
      middleware = params.middleware,
      controllers = params.controllers;

    const registerTemplate = (fileName, folder, key) =>
      fs.readFile(path.resolve(__dirname, `./public/templates/${folder}/${fileName}.tpl`), function (err, data) {
        Comments[key] = data.toString();
      });
    registerTemplate('comments', 'comments', 'template');
    registerTemplate('single', 'comments', 'singleCommentTpl');
    registerTemplate('loginModal', 'modal', 'loginModalTemplate');
    registerTemplate('registerModal', 'modal', 'registerModalTemplate');
    // TODO Apply CSRF to everything
    app.get(
      "/comments/get/:blogger/:id/:pagination(\\d+)?/:sorting(oldest|newest|best)?",
      middleware.applyCSRF,
      Comments.getCommentData,
    );
    app.get("/comments/getAll/:blogger/:ids/",middleware.applyCSRF,Comments.getAllCommentsData);
    app.post("/comments/plugin/register", captchaMiddleware, register);
    app.post("/comments/reply", loggedOrGuestMiddleware, checkGuestUsername, wrapperCaptchaMiddleware, Comments.replyToComment);
    app.post("/comments/publish", passportMiddleware, checkTopicInRSSMiddleware, Comments.publishArticle);
    app.post("/comments/publish-batch", passportMiddleware , Comments.publishBatchArticles);
    app.post("/comments/vote", passportMiddleware, Comments.votePost);
    app.post("/comments/downvote", passportMiddleware, Comments.downvotePost);
    app.post("/comments/bookmark", Comments.bookmarkPost);
    app.post("/comments/edit/:pid", passportMiddleware, Comments.editPost);
    app.get("/comments/plugin/email", emailExists);
    app.get("/comments/plugin/username", userExists);
    app.get("/comments/test", Comments.test)
    app.get("/admin/blog-comments", middleware.admin.buildHeader, renderAdmin);
    app.get("/api/admin/blog-comments", renderAdmin);
    app.post("/comments/delete/:pid", passportMiddleware, Comments.deletePost);
    app.get('/comments/token', middleware.applyCSRF, Comments.getToken);
    app.get('/comments/new/:tid/:timestamp', middleware.applyCSRF, Comments.getNewComments);
    app.get('/comments/bycid/:categoryId/:sorting(oldest|newest|best)?', passportMiddleware, Comments.getAllArticlesCategory);
    app.post('/ulogout', function (req, res) {
      if (req.user && parseInt(req.user.uid, 10) > 0) {
        req.logout();
        res.json({ ok: true });
      } else {
        res.json({ ok: false });
      }
    });
    app.post('/comments/login', localLogin);
    app.post('/attach-topic/:cid', 
    passportMiddleware,
    categoryZeroMiddleware,
    moderatorCategoryMiddleware,
    async function(req, res) {
      CORSFilter(req, res);
      const uid = req.user.uid;
      const { cid } = req.params;
      const { list } = req.body;
      console.log('attach topic', list, {cid, uid});
      try {
        const response = await attachTopics(list, cid, uid);
        return res.status(200).json({
          ok: true,
          message: 'Topics attached',
          response,
        });
      } catch (err) {
        winston.warn('There was an error',err);
        return res.status(500).json({
          ok: true,
          message: err.message
        });
      }
    });
    app.post('/attach-single-topic/:cid/:tid/:articleId', passportMiddleware, categoryZeroMiddleware, moderatorCategoryMiddleware, async function (req, res) {
      const { cid, tid, articleId } = req.params;
      const { uid } = req.user;
      const { blogger } = req.body;
      const isAttached = await attachSingleTopic(cid, tid, articleId, blogger, uid);
      return res.status(200).json({
        ok: isAttached,
        message: isAttached ? 'Topic attached' : 'Topic not attached'
      });
    });
    app.get('/comments/post-count', Comments.getPostCount);
    app.get('/object-topic/:tid/:uid', async function(req, res) {
      return res.json(await getObjectTopic(req.params.tid, req.params.uid))
    });
    app.get('/comments/test-endpoint', passportMiddleware, async function(req, res) {
      res.json({
        ok: true, 
        message: 'It works',
        user: req.user
      })
    })
    app.post('/comments/move', passportMiddleware, moveTopic);
    app.post('/comments/import', /*passportMiddleware,*/ async function(req, res) {
      try {
        const responses = await importData(req.body);
        return res.json({
          ok: true,
          responses,
        });
      } catch (err) {
        res.json({ok: false, message: err.message})
      }
    });
    app.get('/comments/queue_mod', async function (req, res) {
      return res.json(await getModerationQueue(req.user.uid));
    });
    app.post('/comments/approve/:pid', isAdminOrModMiddleware, async function (req, res) {
      try {
        return res.json(await approvePost(req.params.pid));
      } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
          ok: false, message: err.message
        })
      }
    });
    app.post('/comments/reject/:pid', isAdminOrModMiddleware, async function (req, res) {
      try {
        return res.json(await rejectPost(req.params.pid));
      } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
          ok: false, message: err.message
        })
      }
    });
    callback();
  };
})(module);
