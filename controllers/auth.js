const UserPwdResetToken = require('../models/UserPwdResetToken');

const sendMail = require('../services/mailService');
const generateRandomString = require('../services/generateRandomString');
const generateRefreshToken = require('../services/generateRefreshToken');
const generateAccessToken = require('../services/generateAccessToken');

function login(req, res) {
    generateRefreshToken(res, req.user, req.rememberMe);
    const accessToken = generateAccessToken(req.user);
    res.json({status: 200, msg: 'You have logged in', token: accessToken});
}

async function forgotPwd(req, res) {
    const token = generateRandomString(32);
    await UserPwdResetToken.createPath(req.user._id, token);

    const uri = `${process.env.PWD_RESET_URI}${token}`;
    sendMail('pwd-reset', {to: req.user.email, uri});

    res.json({status: 200, msg: 'Please check your inbox or spam folder'});
}

function logout(req, res) {
    res.clearCookie(process.env.REFRESH_TOKEN_COOKIE);
    res.json({status: 200, msg: 'You have successfully logged out'});
}

module.exports = {login, forgotPwd, logout};