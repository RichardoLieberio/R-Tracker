const TransactionError = require('../services/TransactionError');
const mongooseIdValidation = require('../services/mongooseIdValidation');

const User = require('../models/User');
const UserToken = require('../models/UserToken');
const Expense = require('../models/Expense');

async function getAllUsers(req, res) {
    const users = await User.getAllUsers();
    res.json({status: 200, msg: 'Users retrieved successfully.', users});
}

async function updateUser(req, res) {
    if (!mongooseIdValidation(req.params.id)) throw new TransactionError({status: 404, msg: 'Failed to update user. User not found.'});
    if (req.userId === req.params.id) throw new TransactionError({status: 400, msg: 'Cannnot update your own data.'});

    const updated = await User.updateUser(req.params.id, req.data, req.mongooseSession);
    if (!updated) throw new TransactionError({status: 404, msg: 'Failed to update user. User not found.'});

    if (updated.email !== req.data.email || updated.role !== req.data.role) await UserToken.clearToken(req.params.id, req.mongooseSession);

    res.json({status: 200, msg: 'User updated successfully.'});
}

async function changePwd(req, res) {
    if (!mongooseIdValidation(req.params.id)) throw new TransactionError({status: 404, msg: 'Failed to change user password. User not found.'});

    const changed = await User.changePwdByAdmin(req.params.id, req.data.pwd, req.mongooseSession);
    if (!changed) throw new TransactionError({status: 404, msg: 'Failed to change user password. User not found.'});

    await UserToken.clearToken(req.params.id, req.mongooseSession);

    res.json({status: 200, msg: 'User password changed successfully.'});
}

async function blockToken(req, res) {
    if (!mongooseIdValidation(req.params.id)) return res.json({status: 404, msg: 'Failed to block token. User not found.'});
    if (req.userId === req.params.id) return res.json({status: 400, msg: 'Cannnot block your own token.'});

    await UserToken.clearToken(req.params.id);
    res.json({status: 200, msg: 'User token blocked successfully.'});
}

async function whitelist(req, res) {
    if (!mongooseIdValidation(req.params.id)) return res.json({status: 404, msg: 'Failed to whitelist user. User not found.'});
    if (req.userId === req.params.id) return res.json({status: 400, msg: 'Cannnot whitelist yourself.'});

    const whitelisted = await User.whitelist(req.params.id);
    if (!whitelisted) return res.json({status: 404, msg: 'Failed to whitelist user. User not found.'});

    res.json({status: 200, msg: 'User whitelisted successfully.'});
}

async function blacklist(req, res) {
    if (!mongooseIdValidation(req.params.id)) throw new TransactionError({status: 404, msg: 'Failed to blacklist user. User not found.'});
    if (req.userId === req.params.id) throw new TransactionError({status: 400, msg: 'Cannnot blacklist yourself.'});

    const blacklisted = await User.blacklist(req.params.id, req.data.reason, req.userId, req.mongooseSession);
    if (!blacklisted) throw new TransactionError({status: 404, msg: 'Failed to blacklist user. User not found.'});

    await UserToken.clearToken(req.params.id, req.mongooseSession);

    res.json({status: 200, msg: 'User blacklisted successfully.'});
}

async function getUserExpenses(req, res) {
    if (!mongooseIdValidation(req.params.id)) throw new TransactionError({status: 404, msg: 'Failed to get expenses. User not found.'});

    const expenses = await Expense.getExpenses(req.paramns.id);
    res.json({status: 200, msg: 'Expenses retrieved successfully.', expenses});
}

module.exports = {getAllUsers, updateUser, changePwd, blockToken, whitelist, blacklist, getUserExpenses};