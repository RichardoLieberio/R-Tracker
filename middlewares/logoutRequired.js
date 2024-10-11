function logoutRequired(req, res, next) {
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE];
    const accessToken = req.headers['authorization']?.split(' ')[1];

    if (refreshToken || accessToken) return res.json({status: 401, msg: 'You need to log out first to proceed'});
    next();
}

module.exports = logoutRequired;