const generateRefreshToken = require('../services/generateRefreshToken');
const generateAccessToken = require('../services/generateAccessToken');

const User = require('../models/User');

async function login(req, res) {
    const user = await (new User()).checkCredentials(req.data);
    if (!user) return res.json({status: 401, msg: 'Incorrect login credentials'});

    generateRefreshToken(res, user, req.data.rememberMe);
    const accessToken = generateAccessToken(user);

    res.json({status: 200, msg: 'You have logged in', accessToken});
}

function logout(req, res) {
    res.clearCookie(process.env.REFRESH_TOKEN_COOKIE);
    res.json({status: 200, msg: 'You have successfully logged out'});
}

module.exports = {login, logout};