function login(req, res) {
    res.send('Login user');
}

function logout(req, res) {
    res.clearCookie(process.env.REFRESH_TOKEN_COOKIE);
    res.json({status: 200, msg: 'You have successfully logged out'});
}

module.exports = {login, logout};