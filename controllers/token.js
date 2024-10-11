const jwt = require('jsonwebtoken');

function getCSRFToken(req, res) {
    res.json({token: req.csrfToken()});
}

function getJWTToken(req, res) {
    const assessToken = jwt.sign({access: 'This is access token'}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
    const refreshToken = jwt.sign({refresh: 'This is refresh token'}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1h'});
    res.json({assessToken, refreshToken});
}

module.exports = {getCSRFToken, getJWTToken};