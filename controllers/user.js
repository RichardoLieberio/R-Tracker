function register(req, res) {
    res.send(req.data);
}

function getInfo(req, res) {
    res.send('Get user info');
}

function updateInfo(req, res) {
    res.send('Update user');
}

function deleteAccount(req, res) {
    res.send('Delete account');
}

module.exports = {
    register,
    getInfo,
    updateInfo,
    deleteAccount
};