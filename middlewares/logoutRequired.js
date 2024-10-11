const jwt = require('jsonwebtoken');

function logoutRequired(req, res, next) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, function(error) {
        if (!error) return res.json({status: 401, msg: 'You need to log out first to proceed'});
    })

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function(error) {
        if (!error) return res.json({status: 401, msg: 'You need to log out first to proceed'});
    })

    next();
}

module.exports = logoutRequired;