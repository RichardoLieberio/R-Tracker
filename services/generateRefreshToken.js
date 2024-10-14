const jwt = require('jsonwebtoken');

function generateRefreshToken(res, user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
    res.cookie(process.env.REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'strict'
    });
}

module.exports = generateRefreshToken;