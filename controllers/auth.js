const generateRefreshToken = require('../services/generateRefreshToken');
const generateAccessToken = require('../services/generateAccessToken');

const User = require('../models/User');
const UserToken = require('../models/UserToken');

async function login(req, res) {
    const user = await (new User()).checkCredentials(req.data);
    if (!user) return res.json({status: 401, msg: 'Incorrect login credentials'});
    if (user.blacklisted) return res.json({status: 403, msg: 'Your account has been blacklisted'});

    const tokenData = {id: user._id};
    const refreshToken = generateRefreshToken(res, tokenData, req.data.rememberMe);
    const accessToken = generateAccessToken(tokenData);

    await UserToken.login(user._id, refreshToken, accessToken);

    res.json({status: 200, msg: 'You have logged in', accessToken});
}

async function logout(req, res) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE];

    (accessToken || refreshToken) && await UserToken.logout(req.userId);
    res.clearCookie(process.env.REFRESH_TOKEN_COOKIE);

    res.json({status: 200, msg: 'You have successfully logged out'});
}

module.exports = {login, logout};