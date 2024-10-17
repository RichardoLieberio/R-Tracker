const jwt = require('jsonwebtoken');

const generateAccessToken = require('../services/generateAccessToken');

function authRequired(req, res, next) {
    try {
        const accessToken = req.headers['authorization']?.split(' ')[1];
        req.user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch(error) {
        return generateNewAccessToken(req, res);
    }
}

function generateNewAccessToken(req, res) {
    try {
        const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE];
        const {id, role} = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = generateAccessToken({id, role});
        return res.json({status: 200, msg: 'New access token generated successfully', accessToken});
    } catch(error) {
        return res.json({status: 401, msg: 'Invalid or expired refresh token'});
    }
}

module.exports = authRequired;