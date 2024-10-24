const TransactionError = require('../services/TransactionError');
const sendMail = require('../services/mailService');
const generateOtp = require('../services/generateOtp');
const mongooseIdValidation = require('../services/mongooseIdValidation');

const User = require('../models/User');
const UserToken = require('../models/UserToken');
const InactiveUser = require('../models/InactiveUser');
const PwdResetToken = require('../models/PwdResetToken');
const ChangeEmailToken = require('../models/ChangeEmailToken');

async function register(req, res) {
    const otp = generateOtp(+process.env.OTP_LENGTH);
    await InactiveUser.register(req.data, otp);

    sendMail('account-verification', {to: req.data.email, name: req.data.name, otp});

    res.json({status: 202, msg: 'Registration successful. Please check your inbox or spam folder for an OTP to verify your account.'});
}

async function verify(req, res) {
    const user = await InactiveUser.verify(req.data, req.mongooseSession);
    if (!user) throw new TransactionError({status: 400, msg: 'Invalid email or OTP.'});

    const {_id, ...userData} = user.toObject();
    await User.addNewAccount(userData, req.mongooseSession);

    sendMail('account-verified', {to: req.data.email, name: userData.name});

    res.json({status: 201, msg: 'Registration succeeded. Email has been verified.'});
}

async function resetPwd(req, res) {
    const {email, otp, pwd} = req.data;
    const request = await PwdResetToken.checkRequest(email, otp, req.mongooseSession);
    if (!request) throw new TransactionError({status: 400, msg: 'Invalid email or OTP.'});

    const user = await User.resetPwd(email, pwd, req.mongooseSession);
    sendMail('pwd-successfully-reset', {to: email});

    await UserToken.clearToken(user?._id, req.mongooseSession);

    res.json({status: 200, msg: 'Password successfully reset.'});
}

async function getInfo(req, res) {
    const user = (await User.getInfo(req.userId)).toObject();
    delete user._id;
    res.json({status: 200, msg: 'User information retrieved successfully.', user});
}

async function changeName(req, res) {
    await User.changeName(req.userId, req.data.name);
    res.json({status: 200, msg: 'Name updated successfully.'});
}

async function changeEmail(req, res) {
    const {email, otp} = req.data;
    const request = await ChangeEmailToken.checkRequest(req.userId, email, otp, req.mongooseSession);
    if (!request) throw new TransactionError({status: 400, msg: 'Invalid email or OTP.'});

    await User.changeEmail(req.userId, email, req.mongooseSession);
    sendMail('new-email-verified', {to: email});

    res.json({status: 200, msg: 'Email updated successfully.'});
}

async function changePwd(req, res) {
    const {oldPwd, newPwd} = req.data;
    const check = await (new User()).isPwdMatches(req.userId, oldPwd);
    if (!check) return res.json({status: 400, msg: 'Password is incorrect.'});

    await User.changePwd(req.userId, newPwd);

    res.json({status: 200, msg: 'Password updated successfully.'});
}

async function deleteAccount(req, res) {
    if (!mongooseIdValidation(req.params.id) || req.userId !== req.params.id) return res.json({status: 404, msg: 'Account not found.'});

    const {email, name} = await User.deleteAccount(req.userId, req.mongooseSession);
    await UserToken.deleteAccount(req.userId, req.mongooseSession);
    sendMail('account-deleted', {to: email, name});

    res.json({status: 200, msg: 'Your account has been deleted.'});
}

module.exports = {register, verify, resetPwd, getInfo, changeName, changeEmail, changePwd, deleteAccount};