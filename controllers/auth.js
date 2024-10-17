const generateRefreshToken = require('../services/generateRefreshToken');
const generateAccessToken = require('../services/generateAccessToken');

const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');

async function login(req, res) {
    const user = await (new User()).checkCredentials(req.data);
    if (!user) return res.json({status: 401, msg: 'Incorrect login credentials'});

    generateRefreshToken(res, user, req.data.rememberMe);
    const accessToken = generateAccessToken(user);

    res.json({status: 200, msg: 'You have logged in', accessToken});
}

async function logout(req, res) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE];

    (accessToken || refreshToken) && await TokenBlacklist.blacklist(accessToken, refreshToken);
    res.clearCookie(process.env.REFRESH_TOKEN_COOKIE);

    res.json({status: 200, msg: 'You have successfully logged out'});
}

module.exports = {login, logout};