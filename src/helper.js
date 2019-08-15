const posts = require.main.require("./src/posts");
const topics = require.main.require("./src/topics");
const db = require.main.require("./src/database");
const async = require.main.require("async");

const getCacheKey = tid => `cache:nested_tid:${tid}`;

const getTopicPids = tid =>
  new Promise((resolve, reject) => {
    // We want all the posts here
    posts.getPidsFromSet(`tid:${tid}:posts`, 0, -1, false, function data(
      err,
      res
    ) {
      if (err) {
        reject(err);
        as;
      } else {
        resolve(res);
      }
    });
  });

const getPostsData = pids =>
  new Promise((resolve, reject) => {
    posts.getPostsData(pids, function postData(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

const isInCache = tid =>
  new Promise((resolve, reject) => {
    db.exists(getCacheKey(tid), function isInCacheData(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

const getPostDataWithoutCache = async tid => {
  const pids = await getTopicPids(tid);
  return getPostsData(pids);
};

function getNestedChildren(arr, parent = null) {
  const out = [];
  for (const post of arr) {
    if (String(post.toPid) === String(parent)) {
      const children = getNestedChildren(arr, post.pid);
      if (children.length) {
        post.children = children;
      }
      out.push(post);
    }
  }
  return out;
}

const saveToCache = (tid, nestedPosts) => {
  const cacheKey = getCacheKey(tid);
  return async.eachLimit(nestedPosts, 500, function saveToCacheAux(val, cb) {
    db.sortedSetAdd(cacheKey, val.timestamp, JSON.stringify(val), cb);
  });
};

const addPostData = (posts, uid) =>
  new Promise((resolve, reject) => {
    topics.addPostData(posts, uid, function addPostDataCb(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

const getPostsFromCache = tid =>
  new Promise((resolve, reject) => {
    db.getSortedSetRange(getCacheKey(tid), 0, -1, function sortedSetRange(
      err,
      data
    ) {
      if (err) {
        reject(err);
      } else {
        resolve(data.map(JSON.parse));
      }
    });
  });

const getNestedPosts = async (tid, uid, pagination = 0) => {
  const posts = (await getPostDataWithoutCache(tid)).filter(p => !p.deleted);
  for (const p of posts) {
    p.isReply =
      p.hasOwnProperty("toPid") && parseInt(p.toPid) !== parseInt(tid) - 1;
    if (p.toPid === undefined) {
      p.toPid = null;
    }
    p.parentUsername = p.parent ? p.parent.username || "" : "";
    p.deletedReply = !!(p.parent && !p.parent.username);
  }
  const postData = await addPostData(posts, uid);
  const nestedPostsWithData = getNestedChildren(postData);
  const itemsPerPage = 10;
  const start = 0 + pagination * itemsPerPage;
  const end = itemsPerPage + pagination * (itemsPerPage - 1);
  return nestedPostsWithData.slice(start, end);
};

module.exports = {
  getNestedPosts,
  getNestedChildren
};
