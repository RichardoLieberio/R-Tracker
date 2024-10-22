const User = require('../models/User');

async function getUsers(req, res) {
    const users = await User.getAllUsers();
    res.json({status: 200, msg: 'Users retrieved successfully', users});
}

module.exports = {getUsers};