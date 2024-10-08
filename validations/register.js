const User = require('../models/User');

async function register(req, res, next) {
    const {name, email, pwd} = req.body;
    const errorMsg = {};

    const nameErrorMsg = validateName(name);
    if (nameErrorMsg) errorMsg['name'] = nameErrorMsg;

    const emailErrorMsg = await validateEmail(email);
    if (emailErrorMsg) errorMsg['email'] = emailErrorMsg;

    const pwdErrorMsg = validatePwd(pwd);
    if (pwdErrorMsg) errorMsg['pwd'] = pwdErrorMsg;

    if (Object.entries(errorMsg).length) return res.json(errorMsg);

    req.data = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        pwd
    };

    next();
}

function validateName(name) {
    if (!name) return 'Name is required';
    if (typeof(name) !== 'string') return 'Name must be string';

    name = name.trim();

    if (!name) return 'Name is required';
    if (name.length > 50) return 'Name length exceeds 50 characters';
}

async function validateEmail(email) {
    if (!email) return 'Email is required';
    if (typeof(email) !== 'string') return 'Email must be string';

    email = email.trim().toLowerCase();

    if (!email) return 'Email is required';
    if (await User.isEmailRegistered(email)) return 'Email is registered';

    const emailRegex = /^(?!.*\.\.)(?!^\.)(?!.*\.$)(?!.*-$)(?!.*\.-)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)$/;
    if (!emailRegex.test(email)) return 'Email is invalid';
}

function validatePwd(pwd) {
    if (!pwd) return 'Password is required';
    if (typeof(pwd) !== 'string') return 'Password must be string';
    if (pwd.length < 6) return 'Minimum password length is 6 characters';

    const pwdRegexError = {};
    if (!/[A-Z]/.test(pwd)) pwdRegexError['upperCase'] = 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(pwd)) pwdRegexError['lowerCase'] = 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(pwd)) pwdRegexError['number'] = 'Password must contain at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) pwdRegexError['symbol'] = 'Password must contain at least one special character';
    if (Object.entries(pwdRegexError).length) return pwdRegexError;
}

module.exports = {
    register
};