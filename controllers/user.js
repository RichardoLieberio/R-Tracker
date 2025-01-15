const TransactionError = require('../services/TransactionError');
const sendMail = require('../services/mailService');
const generateOtp = require('../services/generateOtp');
const mongooseIdValidation = require('../services/mongooseIdValidation');
const generateRefreshToken = require('../services/generateRefreshToken');
const generateAccessToken = require('../services/generateAccessToken');
const notFoundHandler = require('../services/notFoundHandler');

const User = require('../models/User');
const UserToken = require('../models/UserToken');
const InactiveUser = require('../models/InactiveUser');
const PwdResetToken = require('../models/PwdResetToken');
const ChangeEmailToken = require('../models/ChangeEmailToken');
const Expense = require('../models/Expense');

async function register(req, res) {
    const otp = generateOtp(+process.env.OTP_LENGTH);
    await InactiveUser.register(req.data, otp);

    sendMail('account-verification', {to: req.data.email, name: req.data.name, otp});

    res.json({status: 202, msg: 'Registration successful. Please check your inbox or spam folder for an OTP to verify your account.'});
}

async function verify(req, res) {
    const user = await InactiveUser.verify(req.data, req.mongooseSession);
    if (!user) throw new TransactionError({status: 400, msg: 'The OTP is invalid or has expired.'});

    const {_id, ...userData} = user.toObject();
    const createdUser = await User.addNewAccount(userData, req.mongooseSession);

    sendMail('account-verified', {to: req.data.email, name: userData.name});

    const tokenData = {id: createdUser._id};
    const accessToken = generateAccessToken(tokenData);
    const refreshToken = generateRefreshToken(res, tokenData, false);

    await UserToken.login(createdUser._id, accessToken, refreshToken);

    const userInfo = {name: createdUser.name, email: createdUser.email, role: createdUser.role, created_at: createdUser.created_at, updated_at: createdUser.updated_at};
    res.json({status: 201, msg: 'Registration succeeded. Email has been verified.', accessToken, user: userInfo});
}

async function resetPwd(req, res) {
    const {email, otp, pwd} = req.data;
    const request = await PwdResetToken.checkRequest(email, otp, req.mongooseSession);
    if (!request) throw new TransactionError({status: 400, msg: 'The OTP is invalid or has expired.'});

    const user = await User.resetPwd(email, pwd, req.mongooseSession);
    if (!user) return res.json({status: 404, msg: 'Failed to reset password. Account not found.'});

    sendMail('pwd-successfully-reset', {to: email});

    await UserToken.clearToken(user?._id, req.mongooseSession);

    res.json({status: 200, msg: 'Password successfully reset.'});
}

async function getInfo(req, res) {
    const userInfo = (await User.getInfo(req.userId))?.toObject();
    if (!userInfo) return notFoundHandler(req, res, 'Failed to fetch information. Account not found.');

    delete userInfo._id;
    res.json({status: 200, msg: 'User information retrieved successfully.', userInfo});
}

async function changeName(req, res) {
    const data = await User.changeName(req.userId, req.data.name);
    if (!data) return notFoundHandler(req, res, 'Failed to change name. Account not found.');

    res.json({status: 200, msg: 'Name updated successfully.', data});
}

async function changeEmail(req, res) {
    const {email, otp} = req.data;
    const request = await ChangeEmailToken.checkRequest(req.userId, email, otp, req.mongooseSession);
    if (!request) throw new TransactionError({status: 400, msg: 'Invalid email or OTP.'});

    const data = await User.changeEmail(req.userId, email, req.mongooseSession);
    if (!data) return notFoundHandler(req, res, 'Failed to change email. Account not found.');

    sendMail('new-email-verified', {to: data.email});

    res.json({status: 200, msg: 'Email updated successfully.', data});
}

async function changePwd(req, res) {
    const data = await (new User()).changePwd(req.userId, req.data);

    if (data === null) return notFoundHandler(req, res, 'Failed to change password. Account not found.');
    if (!data) return res.json({status: 400, msg: 'Current password is incorrect.'});

    res.json({status: 200, msg: 'Password updated successfully.', data});
}

async function deleteAccount(req, res) {
    const account = await User.deleteAccount(req.userId, req.mongooseSession);
    if (!account) return notFoundHandler(req, res, 'Failed to delete account. Account not found.');

    await UserToken.deleteAccount(req.userId, req.mongooseSession);
    await Expense.deleteAllExpense(req.userId, req.mongooseSession);
    sendMail('account-deleted', {to: account.email, name: account.name});

    res.json({status: 200, msg: 'Your account has been deleted.'});
}

module.exports = {register, verify, resetPwd, getInfo, changeName, changeEmail, changePwd, deleteAccount};