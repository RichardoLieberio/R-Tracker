const User = require('../models/User');

async function registerValidation(req, res, next) {
    const {name: rawName, email: rawEmail, pwd: rawPwd} = req.body;
    const name = rawName ? String(rawName).trim() : '';
    const email = rawEmail ? String(rawEmail).trim() : '';
    const pwd = rawPwd ? String(rawPwd).trim() : '';
    const errorMsg = {};

    const nameErrorMsg = validateName(name);
    if (nameErrorMsg) errorMsg['name'] = nameErrorMsg;

    const emailErrorMsg = await validateEmail(email);
    if (emailErrorMsg) errorMsg['email'] = emailErrorMsg;

    const pwdErrorMsg = validatePwd(pwd);
    if (pwdErrorMsg) errorMsg['pwd'] = pwdErrorMsg;

    if (Object.entries(errorMsg).length) return res.json(errorMsg);

    req.data = {name, email, pwd};
    next();
}

function validateName(name) {
    if (!name) return 'Name is required';
    if (name.length > 50) return 'Name length exceeds 50 characters';
}

async function validateEmail(email) {
    if (!email) return 'Email is required';
    if (await User.isEmailRegistered(email)) return 'Email is registered';
}

function validatePwd(pwd) {
    if (!pwd) return 'Password is required';
    if (pwd.length < 6) return 'Minimum password length is 6 characters';

    const pwdRegexError = {};
    if (!/[A-Z]/.test(pwd)) pwdRegexError['upperCase'] = 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(pwd)) pwdRegexError['lowerCase'] = 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(pwd)) pwdRegexError['number'] = 'Password must contain at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) pwdRegexError['symbol'] = 'Password must contain at least one special character';
    if (Object.entries(pwdRegexError).length) return pwdRegexError;
}

module.exports = {
    registerValidation
};