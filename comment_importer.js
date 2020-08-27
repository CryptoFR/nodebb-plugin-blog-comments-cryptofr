const db = require.main.require('./src/database');
const winston = require.main.require('winston');
const _ = require('lodash');
const user = require.main.require('./src/user');
const { replyTopic } = require('./helper');

const getUidByEmail = email => db.sortedSetScore('email:uid', email);

const getTidFromArticleId = (blogger, articleId) => 
    db.getObjectField(`blog-comments:${blogger}`, articleId);

const getHandle = async (comment) => {
    const firstHandleTry = comment.user.slice(0, 16).trim(); // Gets first 12 characters
    if (await user.existsBySlug(firstHandleTry)) {
        const handleBase = comment.user.slice(0, 13).trim();
        let i = 0;
        while (true) {
            const newHandle = `${handleBase}${i}`;
            if (!await user.existsBySlug(newHandle)) {
                return newHandle;
            }
            i++;
        }
    } else {
        return firstHandleTry
    }
}

const postSinglePost = async (tid, comment, parentId = undefined, level = 0) => {
    let uid = await getUidByEmail(comment.email);
    winston.warn(`Getting uid ${uid} from email ${comment.email}`);
    let handle = undefined;
    if (_.isNull(uid)) {
        uid = 0;
        handle = await getHandle(comment);
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
        const responses = []
        for(const comment of item.comments) {
            responses.push(await postSinglePost(tid, comment));
        }
        return {
            ok: true,
            articleId: item.articleId,
            responses
        }
    });
    return promises;
}

module.exports = {
    importData,
}