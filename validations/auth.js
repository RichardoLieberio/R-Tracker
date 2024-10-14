const User = require('../models/User');

async function login(req, res, next) {
    const {email, pwd} = req.body;
    const errorMsg = {};
    const user = {};

    const emailValidation = validateEmail(email);
    emailValidation.error
    ? errorMsg['email'] = emailValidation.error
    : user['email'] = emailValidation.email;

    const pwdValidation = validatePwd(pwd);
    pwdValidation.error
    ? errorMsg['pwd'] = pwdValidation.error
    : user['pwd'] = pwdValidation.pwd;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});

    const UserVar = new User();
    req.user = await UserVar.checkCredentials(user);

    if (!req.user) return res.json({status: 401, msg: 'Incorrect login credentials'});
    next();
}

async function forgotPassword(req, res, next) {
    const {email} = req.body;
    const errorMsg = {};
    const user = {};

    const emailValidation = validateEmail(email);
    emailValidation.error
    ? errorMsg['email'] = emailValidation.error
    : user['email'] = emailValidation.email;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});

    req.user = await User.isEmailRegistered(user.email);
    if (!req.user) return res.json({status: 401, msg: 'Please check your inbox or spam folder.'});
    next();
}

function validateEmail(email) {
    if (!email) return {error: 'Email is required'};
    if (typeof(email) !== 'string') return {error: 'Email must be string'};

    email = email.trim().toLowerCase();

    if (!email) return {error: 'Email is required'};

    const emailRegex = /^(?!.*\.\.)(?!^\.)(?!.*\.$)(?!.*-$)(?!.*\.-)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)$/;
    if (!emailRegex.test(email)) return {error: 'Email is invalid'};

    return {email};
}

function validatePwd(pwd) {
    if (!pwd) return {error: 'Password is required'};
    if (typeof(pwd) !== 'string') return {error: 'Password must be string'};

    return {pwd};
}

module.exports = {login, forgotPassword};