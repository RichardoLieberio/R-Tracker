const User = require('../models/User');

async function register(req, res, next) {
    const {name, email, pwd} = req.body;
    const errorMsg = {};
    req.data = {};

    const nameValidation = validateName(name);
    nameValidation.error
    ? errorMsg['name'] = nameValidation.error
    : req.data['name'] = nameValidation.name;

    const emailValidation = await validateEmail(email, true);
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

async function verify(req, res, next) {
    const {email, otp} = req.body;
    const errorMsg = {};
    req.data = {};

    const emailValidation = await validateEmail(email);
    emailValidation.error
    ? errorMsg['email'] = emailValidation.error
    : req.data['email'] = emailValidation.email;

    const otpValidation = validateOtp(otp);
    otpValidation.error
    ? errorMsg['otp'] = otpValidation.error
    : req.data['otp'] = otpValidation.otp;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

async function resetPwd(req, res, next) {
    const {email, otp, pwd} = req.body;
    const errorMsg = {};
    req.data = {};

    const emailValidation = await validateEmail(email);
    emailValidation.error
    ? errorMsg['email'] = emailValidation.error
    : req.data['email'] = emailValidation.email;

    const otpValidation = validateOtp(otp);
    otpValidation.error
    ? errorMsg['otp'] = otpValidation.error
    : req.data['otp'] = otpValidation.otp;

    const pwdValidation = validatePwd(pwd);
    pwdValidation.error
    ? errorMsg['pwd'] = pwdValidation.error
    : req.data['pwd'] = pwdValidation.pwd;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

function changeName(req, res, next) {
    const {name} = req.body;
    const errorMsg = {};
    req.data = {};

    const nameValidation = validateName(name);
    nameValidation.error
    ? errorMsg['name'] = nameValidation.error
    : req.data['name'] = nameValidation.name;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

async function changeEmail(req, res, next) {
    const {email, otp} = req.body;
    const errorMsg = {};
    req.data = {};

    const emailValidation = await validateEmail(email, true);
    emailValidation.error
    ? errorMsg['email'] = emailValidation.error
    : req.data['email'] = emailValidation.email;

    const otpValidation = validateOtp(otp);
    otpValidation.error
    ? errorMsg['otp'] = otpValidation.error
    : req.data['otp'] = otpValidation.otp;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

function changePwd(req, res, next) {
    const {oldPwd, newPwd} = req.body;
    const errorMsg = {};
    req.data = {};

    const oldPwdValidation = validatePwd(oldPwd, true);
    oldPwdValidation.error
    ? errorMsg['oldPwd'] = oldPwdValidation.error
    : req.data['oldPwd'] = oldPwdValidation.pwd;

    const newPwdValidation = validatePwd(newPwd);
    newPwdValidation.error
    ? errorMsg['newPwd'] = newPwdValidation.error
    : req.data['newPwd'] = newPwdValidation.pwd;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

function validateName(name) {
    if (!name) return {error: 'Name is required.'};
    if (typeof(name) !== 'string') return {error: 'Name must be string.'};

    name = name.trim().replace(/\s+/g, ' ');

    if (!name) return {error: 'Name is required.'};
    if (name.length > 50) return {error: 'Name length exceeds 50 characters.'};

    return {name};
}

async function validateEmail(email, checkIsRegistered=false) {
    if (!email) return {error: 'Email is required.'};
    if (typeof(email) !== 'string') return {error: 'Email must be string.'};

    email = email.trim().toLowerCase();

    if (!email) return {error: 'Email is required.'};
    if (checkIsRegistered && await User.isEmailRegistered(email)) return {error: 'Email is registered.'};

    const emailRegex = /^(?!.*\.\.)(?!^\.)(?!.*\.$)(?!.*-$)(?!.*\.-)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)$/;
    if (!emailRegex.test(email)) return {error: 'Email is invalid.'};

    return {email};
}

function validatePwd(pwd, basicValidation=false) {
    if (!pwd) return {error: 'Password is required.'};
    if (typeof(pwd) !== 'string') return {error: 'Password must be string.'};

    if (basicValidation) return {pwd};

    if (pwd.length < 6) return {error: 'Minimum password length is 6 characters.'};

    const pwdRegexError = {};
    if (!/[A-Z]/.test(pwd)) pwdRegexError['upperCase'] = 'Password must contain at least one uppercase letter.';
    if (!/[a-z]/.test(pwd)) pwdRegexError['lowerCase'] = 'Password must contain at least one lowercase letter.';
    if (!/[0-9]/.test(pwd)) pwdRegexError['number'] = 'Password must contain at least one number.';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) pwdRegexError['symbol'] = 'Password must contain at least one special character.';
    if (Object.entries(pwdRegexError).length) return {error: pwdRegexError};

    return {pwd};
}

function validateOtp(otp) {
    if (!otp) return {error: 'OTP is required.'};
    if (typeof(otp) !== 'string') return {error: 'OTP must be string.'};

    otp = otp.trim();

    if (!otp) return {error: 'OTP is required.'};
    if (otp.length !== +process.env.OTP_LENGTH || /[^\d]/.test(otp)) return {error: 'OTP is invalid.'};

    return {otp};
}

module.exports = {register, verify, resetPwd, changeName, changeEmail, changePwd};