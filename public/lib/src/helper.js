"use strict";
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

const sortOldest = (a, b) => a.timestamp - b.timestamp;
const sortNewest = (a, b) => -sortOldest(a, b);
const sortBest = (a, b) => b.votes - a.votes;

const getSortFn = sorting => {
  switch (sorting) {
    case "oldest":
      return sortOldest;
    case "newest":
      return sortNewest;
    case "best":
      return sortBest;
    default:
      throw new Error("Undefined sorting function");
  }
};

const sortRecursively = (array, sorting) => {
  const sortingFn = getSortFn(sorting);
  const sortRecursivelyInternal = myArray => {
    if (!Array.isArray(myArray)) {
      return;
    }
    myArray.sort(sortingFn);
    for (const { children } of myArray) {
      sortRecursivelyInternal(children);
    }
  };
  sortRecursivelyInternal(array);
};

const getPostsWithoutNesting = async (tid, uid) => {
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
  return postData
}

const getNestedPostsWithoutPagination = async (tid, uid, sorting) => {
  const postData = await getPostsWithoutNesting(tid, uid, sorting)
  const nestedPostsWithData = getNestedChildren(postData);
  sortRecursively(nestedPostsWithData, sorting);
  return nestedPostsWithData
}

const getNestedPosts = async (tid, uid, pagination = 0, sorting = "best") => {
  const nestedPostsWithData = await getNestedPostsWithoutPagination(tid, uid, sorting)
  const itemsPerPage = 10;
  const start = 0 + pagination * itemsPerPage;
  const end = itemsPerPage + pagination * (itemsPerPage - 1);
  const isLastPage = end >= nestedPostsWithData.length;
  return {data: nestedPostsWithData.slice(start, end), isLastPage};
};

const assignNestedTopics = (topicsData, posts) => {
  const topicsDataByTid = {}
  for (const t of topicsData) {
    topicsDataByTid[t.tid] = t
  }
  const assignNestedTopicsInternal = (posts) => {
    for (const p of posts) {
      p.topic = topicsDataByTid[p.tid]
      if (p.children) {
        assignNestedTopicsInternal(p.children)
      }
    }
  };
  assignNestedTopicsInternal(posts)
}


const getPostsCategory = async (categoryId, uid, sorting) => {
  const tids = await db.getSortedSetRange(`cid:${categoryId}:tids`, 0, -1);
  const topicsData = await topics.getTopicsByTids(tids)
  const posts = await Promise.all(tids.map(t => getNestedPostsWithoutPagination(t, uid, sorting)))
  const concatenated = posts.reduce((previousValue, acc) => previousValue.concat(acc), [])
  // Next line mutates the post
  assignNestedTopics(topicsData, concatenated)
  return concatenated
}


module.exports = {
  getNestedPosts,
  getNestedChildren,
  getPostsCategory
};
