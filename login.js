var db = require.main.require('./src/database'),
meta = require.main.require('./src/meta'),
posts = require.main.require('./src/posts'),
topics = require.main.require('./src/topics'),
user = require.main.require('./src/user'),
groups = require.main.require('./src/groups'),
privileges = require.main.require('./src/privileges'),
utils = require.main.require('./src/utils'),
fs = require.main.require('fs'),
path = require.main.require('path'),
async = require.main.require('async'),
winston = require.main.require('winston')
jwt = require.main.require('jsonwebtoken');

const makeErrorObj = (error) => ({
    ok: false,
    error: error.message
})

const makeError = (res, error) => {
    return res.status(403).json(makeErrorObj(error));
}

const localLogin = async function (req, res) {
    const { username, password } = req.body;
	if (!username) {
		return makeError(res, new Error('[[error:invalid-username]]'));
	}

	if (!password || !utils.isPasswordValid(password)) {
		return makeError(res, new Error('[[error:invalid-password]]'));
	}

	if (password.length > 4096) {
		return makeError(res, new Error('[[error:password-too-long]]'));
	}

	const userslug = utils.slugify(username);
	const uid = await user.getUidByUserslug(userslug);
	try {
		const [userData, isAdminOrGlobalMod, banned, hasLoginPrivilege] = await Promise.all([
			user.getUserFields(uid, ['uid', 'passwordExpiry']),
			user.isAdminOrGlobalMod(uid),
			user.bans.isBanned(uid),
			privileges.global.can('local:login', uid),
		]);

		userData.isAdminOrGlobalMod = isAdminOrGlobalMod;

		if (parseInt(uid, 10) && !hasLoginPrivilege) {
			return makeError(res, new Error('[[error:local-login-disabled]]'));
		}

		if (banned) {
			return makeError(res, new Error('[[error:banned]]'));
		}

		const passwordMatch = await user.isPasswordCorrect(uid, password, req.ip);
		if (!passwordMatch) {
			return makeError(res, new Error('[[error:invalid-login-credentials]]'));
        }
        jwt.sign({ uid }, meta.config['blog-comments:jwt-secret-key'], { algorithm: 'RS256' }, function(err, token) {
            if (err) {
                return makeError(res, new Error('[[error:invalid-token]]'));
            }
            return res.status(200).json({
                ok : true, 
                message : 'Login successful',
                token
            })
        });
	} catch (err) {
		makeError(res, err);
    }
}

module.exports = {
    localLogin,
}