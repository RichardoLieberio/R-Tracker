require('dotenv').config();

const UserTemp = require('../models/UserTemp');

async function register(req, res) {
    const User = new UserTemp();
    const otp = generateOtp();
    await User.register(req.data, otp);
    await sendOtpToEmail(req.data.email, otp);
    res.json({status: 202, msg: 'Registration is in process. Please check your email for the OTP'});
}

function generateOtp() {
    const otp = Math.floor(10 ** (+process.env.OTP_LENGTH - 1) + Math.random() * 9 * 10 ** (+process.env.OTP_LENGTH - 1));
    return otp.toString();
}

async function sendOtpToEmail(email, otp) {
    console.log(`Send otp ${otp} to ${email}`);
}

module.exports = {
    register
};