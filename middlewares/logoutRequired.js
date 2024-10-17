const jwt = require('jsonwebtoken');

const TokenBlacklist = require('../models/TokenBlacklist');

async function logoutRequired(req, res, next) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE];

    try {
        await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
        await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        next();
    } catch(error) {
        res.json({status: 401, msg: 'You need to log out first to proceed'});
    }
}

function verifyToken(token, secret) {
    return new Promise(function(resolve, reject) {
        jwt.verify(token, secret, async function(error) {
            if (error) return resolve();
            await TokenBlacklist.isTokenBlacklisted(token) ? resolve() : reject();
        });
    });
}

module.exports = logoutRequired;