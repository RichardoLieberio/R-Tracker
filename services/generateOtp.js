function generateOtp(length) {
    const otp = Math.floor(10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1));
    return otp.toString();
}

module.exports = generateOtp;