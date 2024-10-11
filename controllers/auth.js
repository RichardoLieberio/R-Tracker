function login(req, res) {
    res.send('Login user');
}

function logout(req, res) {
    res.send('User logout');
}

module.exports = {login, logout};