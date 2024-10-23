const TransactionError = require('../services/TransactionError');
const mongooseIdValidation = require('../services/mongooseIdValidation');

const User = require('../models/User');
const UserToken = require('../models/UserToken');

async function getAllUsers(req, res) {
    const users = await User.getAllUsers();
    res.json({status: 200, msg: 'Users retrieved successfully', users});
}

async function blockToken(req, res) {
    await UserToken.clearToken(req.params.id);
    res.json({status: 200, msg: 'User token blocked successfully'});
}

async function blacklist(req, res) {
    if (req.userId === req.params.id) return res.json({status: 400, msg: 'Cannnot blacklist yourself'});

    const blacklisted = await User.blacklist(req.params.id, req.data.reason, req.userId, req.mongooseSession);
    if (!blacklisted) throw new TransactionError({status: 404, msg: 'Failed to blacklist user. User not found'});

    await UserToken.clearToken(req.params.id, req.mongooseSession);

    res.json({status: 200, msg: 'User blacklisted successfully'});
}

async function changePwd(req, res) {
    if (!mongooseIdValidation(req.params.id)) throw new TransactionError({status: 404, msg: 'Failed to change user password. User not found'});

    const changed = await User.changePwdByAdmin(req.params.id, req.data.pwd, req.mongooseSession);
    if (!changed) throw new TransactionError({status: 404, msg: 'Failed to change user password. User not found'});

    await UserToken.clearToken(req.params.id, req.mongooseSession);

    res.json({status: 200, msg: 'User password changed successfully'});
}

module.exports = {getAllUsers, blockToken, blacklist, changePwd};