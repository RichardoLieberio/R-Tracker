const verifyToken = require('../services/verifyToken');

async function logoutRequired(req, res, next) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE];

    if (await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET) || await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET))
    return res.json({status: 401, msg: 'You need to log out first to proceed.'});

    next();
}

module.exports = logoutRequired;