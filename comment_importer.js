const db = require.main.require('./src/database');
const topic = require.main.require('./src/topic');
const winston = require.main.require('winston');
const _ = require('lodash')
const { replyTopic } = require('./helper');

const getUidByEmail = email => db.sortedSetScore('email:uid', email);

const getTidFromArticleId = (blogger, articleId) => 
    db.getObjectField(`blog-comments:${blogger}`, articleId);

const postSinglePost = async (tid, comment, parentId = undefined, level = 0) => {
    let uid = await getUidByEmail(comment.email);
    winston.warn(`Getting uid ${uid} from email ${comment.email}`);
    let handle = undefined;
    if (_.isNull(uid)) {
        uid = 0;
        handle = comment.user;
    }
    winston.warn(`Replying to topic ${tid}, ${uid}, ${parentId}, ${comment.content}, ${handle}`)
    const data = await replyTopic(tid, uid, parentId, comment.content, handle);
    const responses = [];
    const newParentPid = level >= 2 ? parentId : data.pid;
    if (!_.isEmpty(comment.children)) {
        for (const c of comment.children) {
            const response = await postSinglePost(tid, c, newParentPid, level + 1);
            responses.push(response);
        }
    }
    return {
        ...data,
        responses,
        articleId: comment.articleId,
        ok: true,
    }
}

const importData = (commentData) => {
    const promises = commentData.map(async item => {
        const tid = await getTidFromArticleId('admin', item.articleId);
        winston.warn(`Getting tid ${tid} from article ${item.articleId}`);
        if(_.isNull(tid))  {
            return {
                ok: false,
                articleId: item.articleId,
                responses: []
            }
        }
        return postSinglePost(tid, item);
    });
    return promises;
}

module.exports = {
    importData,
}