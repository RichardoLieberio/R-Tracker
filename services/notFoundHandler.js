const UserToken = require('../models/UserToken');

async function notFoundHandler(req, res, msg) {
    await UserToken.deleteAccount(req.userId);
    res.clearCookie(process.env.REFRESH_TOKEN_COOKIE);

    return res.json({status: 404, msg});
}

module.exports = notFoundHandler;