const jwt = require('jsonwebtoken');

const TransactionError = require('../services/TransactionError');
const sendMail = require('../services/mailService');
const User = require('../models/User');
const UserTemp = require('../models/UserTemp');

async function register(req, res) {
    const otp = generateOtp();
    const UserTempVar = new UserTemp();
    await UserTempVar.register(req.data, otp);

    sendMail('verification', {to: req.data.email, otp});

    const data = {email: req.data.email};
    const token = generateToken(data, 15 * 60);

    res.json({status: 202, msg: 'Registration is in process. Please check your email for the OTP', token});
}

async function validate(req, res) {
    const user = await UserTemp.findOneAndDelete({email: req.data.email}, {session: req.mongooseSession});
    if (!user) throw new TransactionError({status: 404, msg: 'Validation failed. Email not found'});

    const {name, email, pwd, otp} = user;
    if (otp !== req.data.otp) throw new TransactionError({status: 401, msg: 'Validation failed. OTP is incorrect'});

    await User.create([{name, email, pwd}], {session: req.mongooseSession});

    res.json({status: 201, msg: 'Registration succeeded. Email has been validated'});
}

function generateOtp() {
    const otp = Math.floor(10 ** (+process.env.OTP_LENGTH - 1) + Math.random() * 9 * 10 ** (+process.env.OTP_LENGTH - 1));
    return otp.toString();
}

function generateToken(info, expiryTime) {
    return jwt.sign(info, process.env.JWT_SECRET, {expiresIn: expiryTime});
}

module.exports = {register, validate};