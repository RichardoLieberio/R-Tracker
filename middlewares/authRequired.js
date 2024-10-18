const verifyToken = require('../services/verifyToken');
const generateAccessToken = require('../services/generateAccessToken');

const UserToken = require('../models/UserToken');

async function authRequired(req, res, next) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    req.userId = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (req.userId) return next();

    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE];
    req.userId = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!req.userId) return res.json({status: 401, msg: 'Invalid or expired refresh token'});

    const newAccessToken = generateAccessToken({id: req.userId});
    await UserToken.resetAccessToken(req.userId, newAccessToken);
    res.json({status: 200, msg: 'New access token generated successfully', accessToken: newAccessToken});
}

module.exports = authRequired;