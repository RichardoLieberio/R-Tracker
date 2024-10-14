const generateRefreshToken = require('../services/generateRefreshToken');
const generateAccessToken = require('../services/generateAccessToken');

function login(req, res) {
    generateRefreshToken(res, req.user, req.rememberMe);
    const accessToken = generateAccessToken(req.user);
    res.json({status: 200, msg: 'You have logged in', token: accessToken});
}

function logout(req, res) {
    res.clearCookie(process.env.REFRESH_TOKEN_COOKIE);
    res.json({status: 200, msg: 'You have successfully logged out'});
}

module.exports = {login, logout};