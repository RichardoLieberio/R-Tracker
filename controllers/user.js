const User = require('../models/User');

async function register(req, res) {
    const user = new User();
    await user.register(req.data);
    res.json({status: 201, msg: 'User registered successfully'});
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