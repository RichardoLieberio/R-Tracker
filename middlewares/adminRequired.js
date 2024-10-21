const User = require('../models/User');

async function adminRequired(req, res, next) {
    await User.isAdmin(req.userId) ? next() : res.json({status: 403, msg: 'Access Denied: You do not have the necessary permissions to access this resource'});
}

module.exports = adminRequired;