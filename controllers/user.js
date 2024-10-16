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

async function forgotPwd(req, res) {
    if (!await User.isEmailRegistered(req.data.email)) return res.json({status: 200, msg: 'Please check your inbox or spam folder'});

    const otp = generateOtp(+process.env.OTP_LENGTH);
    await PwdResetToken.addRequest(req.data.email, otp);

    sendMail('pwd-reset', {to: req.data.email, otp});

    res.json({status: 200, msg: 'Please check your inbox or spam folder'});
}

async function resetPwd(req, res) {
    const {email, pwd, otp} = req.data;
    const request = await PwdResetToken.checkRequest(email, otp, req.mongooseSession);
    if (!request) throw new TransactionError({status: 400, msg: 'Invalid email or OTP'});

    const pwdChanged = await User.changePwd(email, pwd, req.mongooseSession);
    if (!pwdChanged) return res.json({status: 404, msg: 'Failed to reset password. User account not found'});

    sendMail('pwd-successfully-reset', {to: email});

    res.json({status: 200, msg: 'Password successfully reset'});
}

async function changeName(req, res) {
    await User.findOneAndUpdate({_id: req.user.id}, {name: req.data.name});
    res.json({status: 200, msg: 'Name updated successfully'});
}

async function changeEmail(req, res) {
    const user = await User.findOne({_id: req.user.id, email: req.data.email});
    if (user) return {status: 422, msg: {email: 'Email is registered'}};

    const token = generateRandomString(32);
    await ChangeEmailToken.createPath(req.user._id, req.data.email, token);

    const uri = `${process.env.PUBLIC_URI}change-email/${token}`;
    sendMail('change-email', {to: req.data.email, uri});

    res.json({status: 200, msg: 'Please check your inbox or spam folder'});
}

module.exports = {register, verify, forgotPwd, resetPwd, changeName, changeEmail};