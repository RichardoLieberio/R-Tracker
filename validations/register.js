const jwt = require('jsonwebtoken');

const User = require('../models/User');

async function register(req, res, next) {
    const {name, email, pwd} = req.body;
    const errorMsg = {};
    req.data = {};

    const nameValidation = validateName(name);
    nameValidation.error
    ? errorMsg['name'] = nameValidation.error
    : req.data['name'] = nameValidation.name;

    const emailValidation = await validateEmail(email);
    emailValidation.error
    ? errorMsg['email'] = emailValidation.error
    : req.data['email'] = emailValidation.email;

    const pwdValidation = validatePwd(pwd);
    pwdValidation.error
    ? errorMsg['pwd'] = pwdValidation.error
    : req.data['pwd'] = pwdValidation.pwd;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

async function validate(req, res, next) {
    const {otp, token} = req.body;
    const errorMsg = {};
    req.data = {};

    const otpValidation = validateOtp(otp);
    otpValidation.error
    ? errorMsg['otp'] = otpValidation.error
    : req.data['otp'] = otpValidation.otp;

    const tokenValidation = await validateToken(token);
    tokenValidation.error
    ? errorMsg['token'] = tokenValidation.error
    : req.data['email'] = tokenValidation.email;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

function validateName(name) {
    if (!name) return {error: 'Name is required'};
    if (typeof(name) !== 'string') return {error: 'Name must be string'};

    name = name.trim().replace(/\s+/g, ' ');

    if (!name) return {error: 'Name is required'};
    if (name.length > 50) return {error: 'Name length exceeds 50 characters'};

    return {name};
}

async function validateEmail(email) {
    if (!email) return {error: 'Email is required'};
    if (typeof(email) !== 'string') return {error: 'Email must be string'};

    email = email.trim().toLowerCase();

    if (!email) return {error: 'Email is required'};
    if (await User.isEmailRegistered(email)) return {error: 'Email is registered'};

    const emailRegex = /^(?!.*\.\.)(?!^\.)(?!.*\.$)(?!.*-$)(?!.*\.-)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)$/;
    if (!emailRegex.test(email)) return {error: 'Email is invalid'};

    return {email};
}

function validatePwd(pwd) {
    if (!pwd) return {error: 'Password is required'};
    if (typeof(pwd) !== 'string') return {error: 'Password must be string'};
    if (pwd.length < 6) return {error: 'Minimum password length is 6 characters'};

    const pwdRegexError = {};
    if (!/[A-Z]/.test(pwd)) pwdRegexError['upperCase'] = 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(pwd)) pwdRegexError['lowerCase'] = 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(pwd)) pwdRegexError['number'] = 'Password must contain at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) pwdRegexError['symbol'] = 'Password must contain at least one special character';
    if (Object.entries(pwdRegexError).length) return {error: pwdRegexError};

    return {pwd};
}

function validateOtp(otp) {
    if (!otp) return {error: 'OTP is required'};
    if (typeof(otp) !== 'string') return {error: 'OTP must be string'};

    otp = otp.trim();

    if (!otp) return {error: 'OTP is required'};
    if (otp.length !== +process.env.OTP_LENGTH || /[^\d]/.test(otp)) return {error: 'OTP is invalid'};

    return {otp};
}

async function validateToken(token) {
    if (!token) return {error: 'Token is required'};
    try {
        const data = await jwt.verify(token, process.env.OTP_SECRET);
        if (!data || !data.email) return {error: 'Invalid token payload'};

        return {email: data.email};
    } catch(error) {
        return {error: 'Token is invalid or expired'};
    }
}

module.exports = {register, validate};