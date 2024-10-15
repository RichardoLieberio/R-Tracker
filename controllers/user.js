const jwt = require('jsonwebtoken');

const TransactionError = require('../services/TransactionError');
const sendMail = require('../services/mailService');
const generateRandomString = require('../services/generateRandomString');

const User = require('../models/User');
const InactiveUser = require('../models/InactiveUser');
const PwdResetToken = require('../models/PwdResetToken');
const ChangeEmailToken = require('../models/ChangeEmailToken');

async function register(req, res) {
    const token = generateRandomString(32);
    await InactiveUser.register(req.data, token);

    const uri = `${process.env.PUBLIC_URI}verify-account/${token}`
    sendMail('verification', {to: req.data.email, uri});

    res.json({status: 202, msg: 'Registration is in process. To verify your account, please check your inbox or spam folder'});
}

async function validate(req, res) {
    const user = await InactiveUser.findOneAndDelete({email: req.data.email}, {session: req.mongooseSession});
    if (!user) throw new TransactionError({status: 404, msg: 'Validation failed. Email not found'});

    const {name, email, pwd, otp} = user;
    if (otp !== req.data.otp) throw new TransactionError({status: 401, msg: 'Validation failed. OTP is incorrect'});

    await User.create([{name, email, pwd}], {session: req.mongooseSession});

    res.json({status: 201, msg: 'Registration succeeded. Email has been validated'});
}

async function forgotPwd(req, res) {
    const token = generateRandomString(32);
    await PwdResetToken.createPath(req.user._id, token);

    const uri = `${process.env.PUBLIC_URI}password-reset/${token}`;
    sendMail('pwd-reset', {to: req.user.email, uri});

    res.json({status: 200, msg: 'Please check your inbox or spam folder'});
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

function generateOtp() {
    const otp = Math.floor(10 ** (+process.env.OTP_LENGTH - 1) + Math.random() * 9 * 10 ** (+process.env.OTP_LENGTH - 1));
    return otp.toString();
}

function generateToken(info, expiryTime) {
    return jwt.sign(info, process.env.OTP_SECRET, {expiresIn: expiryTime});
}

module.exports = {register, validate, forgotPwd, changeName, changeEmail};