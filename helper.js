"use strict";
const posts = require.main.require("./src/posts");
const topics = require.main.require("./src/topics");
const db = require.main.require("./src/database");
const groups = require.main.require("./src/groups");
const async = require.main.require("async");
const _ = require('lodash')

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

const getUsersData = async (data) => {
  const uids = _.uniq(data.map(post => post.uid))
  const myGroups = await groups.getUserGroups(uids);
  const groupDataById = {};
  const len = myGroups.length;
  for (let i = 0; i < len; i++) {
    groupDataById[uids[i]] = myGroups[i];
  }
  for (const post of data) {
    post.user.groupData = groupDataById[post.uid]
  }
  return data
}

const addPostData = async (posts, uid) => {
  const data = await topics.addPostData(posts, uid);
  return getUsersData(data)
}

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
  // Next lines mutates the post
  assignNestedTopics(topicsData, concatenated)
  return addAllPostsWithChildren(concatenated)
}

const addAllPostsWithChildren = posts => {
  const isInPosts = {}
  const comments = []
  const addAllPostsWithChildrenInternal = posts => {
    for (const c of posts) {
      if (isInPosts.hasOwnProperty(c.pid)) {
        return
      }
      comments.push(c)
      isInPosts[c.pid] = true;
      if (c.children) {
        addAllPostsWithChildrenInternal(c.children)
      }
    }
  }
  addAllPostsWithChildrenInternal(posts)
  return comments
}

const getDate = (date) => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const getKey = (date, title) => `${date}/${title}`;

// How to get all topics of category?
// We can use zrange cid:{cid}:tids and then for each tid get the topic

const getObjectTopic = async (cid, uid) => {
  const tids = await db.getSortedSetRange(`cid:${cid}:tids`, 0, -1);
  const topicsByTids = await topics.getTopicsByTids(tids, uid);
  const mappedTopics = topicsByTids.map(t => {
    return {
      tid: t.tid,
      title: t.title,
      date: getDate(new Date(Date.parse(t.timestampISO))),
      url: t.url,
    }
  })
  const obj = {}
  for (const t of mappedTopics) {
    const key = getKey(t.date, t.title);
    if (obj.hasOwnProperty(key)) {
      obj[key].push(t);
    } else {
      obj[key] = [t];
    }
  }
  return obj
}


/*
Primero findTopics en el forum 

data {[{... title,date,ArticleId,Blogger}],cid}




Endpoint
function attachTopicWithArticle(title, date, ArticleId, blogger, cid)
busca en el forum en el cid los topics que hagan match con title & date = $topic


db.setObjectField('blog-comments:' + blogger, ArticleId, $topic.tid); 


https://testforum.cryptofr.com/comments/get/blogger/ArticleId/0/newest

 @param obj Object with tid
*/
const attachTopicWithArticle = async (obj, title, date, articleId, blogger) => {
  // Note: We might need to make sure date is object Date
  const key = getKey(date, title);
  if (obj.hasOwnProperty(key)) {
    if (obj[key].length === 1) {
      const val = obj[key][0];
      await db.setObjectField(`blog-comments:${blogger}`, articleId, val.tid);
      return { 
        code: 0,
        articleId,
        tids: [val.tid],
        message: 'Topic attached'
      };
    } else {
      return {
        code: 1,
        articleId,
        message: 'Article with two possible resolutions found, manual resolution is needed',
        tids: obj[key].map(t => t.tid)
      }
    }
    
  }
  return {
    code: 2,
    articleId,
    tids: [],
    message: 'Topic not found'
  };
}

const attachTopics = async (list, cid, uid) => {
  const obj = await getObjectTopic(cid, uid);
  const promises = [];
  for (const { title, date, id, blogger } of list) {
    const p = attachTopicWithArticle(
      obj,
      title, 
      getDate(new Date(Date.parse(date))),
      id,
      blogger
    );
    promises.push(p)
  }
  return Promise.all(promises)
}

module.exports = {
  getNestedPosts,
  getNestedChildren,
  getPostsCategory,
  getObjectTopic,
  attachTopics
};
