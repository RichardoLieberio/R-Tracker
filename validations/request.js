const User = require('../models/User');

async function resetPwd(req, res, next) {
    const {email} = req.body;
    const errorMsg = {};
    req.data = {};

    const emailValidation = await validateEmail(email);
    emailValidation.error
    ? errorMsg['email'] = emailValidation.error
    : req.data['email'] = emailValidation.email;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

async function changeEmail(req, res, next) {
    const {email} = req.body;
    const errorMsg = {};
    req.data = {};

    const emailValidation = await validateEmail(email, true);
    emailValidation.error
    ? errorMsg['email'] = emailValidation.error
    : req.data['email'] = emailValidation.email;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

async function validateEmail(email, checkIsRegistered=false) {
    if (!email) return {error: 'Email is required'};
    if (typeof(email) !== 'string') return {error: 'Email must be string'};

    email = email.trim().toLowerCase();

    if (!email) return {error: 'Email is required'};
    if (checkIsRegistered && await User.isEmailRegistered(email)) return {error: 'Email is registered'};

    const emailRegex = /^(?!.*\.\.)(?!^\.)(?!.*\.$)(?!.*-$)(?!.*\.-)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)$/;
    if (!emailRegex.test(email)) return {error: 'Email is invalid'};

    return {email};
}

module.exports = {resetPwd, changeEmail};