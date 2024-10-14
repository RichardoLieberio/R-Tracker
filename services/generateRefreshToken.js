const jwt = require('jsonwebtoken');

function generateRefreshToken(res, user, rememberMe) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: rememberMe ? '30d' : '1h'});
    res.cookie(process.env.REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
        sameSite: 'strict'
    });
}

module.exports = generateRefreshToken;