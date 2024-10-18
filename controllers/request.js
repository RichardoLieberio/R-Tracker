const sendMail = require('../services/mailService');
const generateOtp = require('../services/generateOtp');

const User = require('../models/User');
const PwdResetToken = require('../models/PwdResetToken');
const ChangeEmailToken = require('../models/ChangeEmailToken');

async function resetPwd(req, res) {
    if (!await User.isEmailRegistered(req.data.email)) return res.json({status: 200, msg: 'Please check your inbox or spam folder'});

    const otp = generateOtp(+process.env.OTP_LENGTH);
    await PwdResetToken.addRequest(req.data.email, otp);

    sendMail('pwd-reset', {to: req.data.email, otp});

    res.json({status: 200, msg: 'Please check your inbox or spam folder'});
}

async function changeEmail(req, res) {
    const otp = generateOtp(+process.env.OTP_LENGTH);
    await ChangeEmailToken.addRequest(req.userId, req.data.email, otp);

    sendMail('new-email-verification', {to: req.data.email, otp});

    res.json({status: 200, msg: 'Please check your inbox or spam folder'});
}

module.exports = {resetPwd, changeEmail};