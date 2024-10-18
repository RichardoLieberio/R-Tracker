const TransactionError = require('../services/TransactionError');
const sendMail = require('../services/mailService');
const generateOtp = require('../services/generateOtp');

const User = require('../models/User');
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
    if (!user) throw new TransactionError({status: 400, msg: 'Invalid email or OTP'});

    const {_id, ...userData} = user.toObject();
    await User.addNewAccount(userData, req.mongooseSession);

    sendMail('account-verified', {to: req.data.email, name: userData.name});

    res.json({status: 201, msg: 'Registration succeeded. Email has been verified'});
}

async function resetPwd(req, res) {
    const {email, pwd, otp} = req.data;
    const request = await PwdResetToken.checkRequest(email, otp, req.mongooseSession);
    if (!request) throw new TransactionError({status: 400, msg: 'Invalid email or OTP'});

    const pwdChanged = await User.resetPwd(email, pwd, req.mongooseSession);
    if (!pwdChanged) return res.json({status: 404, msg: 'Failed to reset password. User account not found'});

    sendMail('pwd-successfully-reset', {to: email});

    res.json({status: 200, msg: 'Password successfully reset'});
}

async function changeName(req, res) {
    const nameChanged = await User.changeName(req.userId, req.data.name);
    if (!nameChanged) return res.json({status: 404, msg: 'Failed to change name. User account not found'});
    res.json({status: 200, msg: 'Name updated successfully'});
}

async function changeEmail(req, res) {
    const {email, otp} = req.data;
    const request = await ChangeEmailToken.checkRequest(req.userId, email, otp, req.mongooseSession);
    if (!request) throw new TransactionError({status: 400, msg: 'Invalid email or OTP'});

    const emailChanged = await User.changeEmail(req.userId, email, req.mongooseSession);
    if (!emailChanged) return res.json({status: 404, msg: 'Failed to change email. User account not found'});

    sendMail('new-email-verified', {to: email});

    res.json({status: 200, msg: 'Email updated successfully'});
}

module.exports = {register, verify, resetPwd, changeName, changeEmail};