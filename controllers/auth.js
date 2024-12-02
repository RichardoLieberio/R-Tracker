const generateRefreshToken = require('../services/generateRefreshToken');
const generateAccessToken = require('../services/generateAccessToken');

const User = require('../models/User');
const UserToken = require('../models/UserToken');

async function login(req, res) {
    const userInfo = await (new User()).checkCredentials(req.data);
    if (!userInfo) return res.json({status: 401, msg: 'Incorrect login credentials.'});
    if (userInfo.blacklisted) return res.json({status: 403, msg: 'Your account has been blacklisted.', reason: userInfo.blacklist_reason});

    const tokenData = {id: userInfo._id};
    const accessToken = generateAccessToken(tokenData);
    const refreshToken = generateRefreshToken(res, tokenData, req.data.rememberMe);

    await UserToken.login(userInfo._id, accessToken, refreshToken);

    const {name, email, role, created_at, updated_at} = userInfo;

    res.json({status: 200, msg: 'You have logged in.', accessToken, userInfo: {name, email, role, created_at, updated_at}});
}

async function logout(req, res) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE];

    (accessToken || refreshToken) && await UserToken.logout(accessToken, refreshToken);
    res.clearCookie(process.env.REFRESH_TOKEN_COOKIE);

    res.json({status: 200, msg: 'You have successfully logged out.'});
}

module.exports = {login, logout};