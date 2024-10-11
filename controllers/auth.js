const jwt = require('jsonwebtoken');

function login(req, res) {
    const refreshToken = jwt.sign(req.user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
    res.cookie(process.env.REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'strict'
    });

    const accessToken = jwt.sign(req.user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    res.json({status: 200, msg: 'You have logged in', token: accessToken});
}

function logout(req, res) {
    res.clearCookie(process.env.REFRESH_TOKEN_COOKIE);
    res.json({status: 200, msg: 'You have successfully logged out'});
}

module.exports = {login, logout};