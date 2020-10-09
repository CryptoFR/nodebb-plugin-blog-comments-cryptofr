const db = require.main.require('./src/database');
const winston = require.main.require('winston');
const _ = require('lodash');
const user = require.main.require('./src/user');
const topic = require.main.require('./src/topics');
const posts = require.main.require('./src/posts');
const {turndownService} = require('./turndown');

const getImportedCommentsKey = blogger => 'imported_commentids:' + blogger;

const getPidOfCommentId = (commentId, blogger) => 
    db.sortedSetScore(getImportedCommentsKey(blogger), commentId);

const POST_DATA_TO_RETURN = [
    'pid', 'uid', 'tid', 'content', 'handle', 'timestampISO', 'toPid', 'isAlreadyImported'
]

// Here we could return the imported data
const replyTopic = async (data, commentId, blogger) => {
    const pidOfComment = await getPidOfCommentId(commentId, blogger);
    if (pidOfComment !== null) {
        // We return without posting a new comment
        const postData = await posts.getPostFields(pidOfComment, POST_DATA_TO_RETURN)
        postData.isAlreadyImported = true;
        return postData;
    }
    const tid = data.tid;
    const topicData = await topic.getTopicData(tid);
    data.cid = topicData.cid;
    data.content = data.content.trim();
    const postData = await posts.create(data);
    await db.sortedSetAdd(getImportedCommentsKey(blogger), postData.pid, commentId);
    return postData;
}

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

const postSinglePost = async (tid, comment, blogger, toPid = undefined, level = 0) => {
    let uid = await getUidByEmail(comment.userEmail);
    let handle = undefined;
    if (_.isNull(uid)) {
        uid = 0;
        handle = await getHandle(comment);
    }
    const content = turndownService.turndown(comment.content);
    const data = await replyTopic({tid, uid, toPid, content, handle}, comment.commentId);
    const responses = [];
    const newParentPid = level >= 2 ? toPid : data.pid;
    if (!_.isEmpty(comment.children)) {
        for (const c of comment.children) {
            const response = await postSinglePost(tid, c, blogger, newParentPid, level + 1);
            responses.push(response);
        }
    }
    const toReturn = _.pick(data, POST_DATA_TO_RETURN);
    return {
        ...toReturn,
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
        } else {
            // Check that the article exists and hasn't been deleted
            const topicData = await topic.getTopicData(tid);
            if (_.isNull(topicData)) {
                return {
                    ok: false,
                    articleId: item.articleId,
                    responses: []
                }
            }
        }
        const responses = []
        for(const comment of item.comments) {
            responses.push(await postSinglePost(tid, comment, 'admin'));
        }
        return {
            ok: true,
            articleId: item.articleId,
            responses
        }
    });
    return Promise.all(promises);
}

module.exports = {
    importData,
}