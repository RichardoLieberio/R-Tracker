const User = require('../models/User');

async function updateUser(req, res, next) {
    const {name, email, role} = req.body;
    const errorMsg = {};
    req.data = {};

    const nameValidation = validateName(name);
    nameValidation.error
    ? errorMsg['name'] = nameValidation.error
    : req.data['name'] = nameValidation.name;

    const emailValidation = await validateEmail(email, req.params.id);
    emailValidation.error
    ? errorMsg['email'] = emailValidation.error
    : req.data['email'] = emailValidation.email;

    const roleValidation = validateRole(role);
    roleValidation.error
    ? errorMsg['role'] = roleValidation.error
    : req.data['role'] = roleValidation.role;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

function changePwd(req, res, next) {
    const {pwd} = req.body;
    const errorMsg = {};
    req.data = {};

    const pwdValidation = validatePwd(pwd);
    pwdValidation.error
    ? errorMsg['pwd'] = pwdValidation.error
    : req.data['pwd'] = pwdValidation.pwd;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

function blacklist(req, res, next) {
    const {reason} = req.body;
    const errorMsg = {};
    req.data = {};

    const reasonValidation = validateReason(reason);
    reasonValidation.error
    ? errorMsg['reason'] = reasonValidation.error
    : req.data['reason'] = reasonValidation.reason;

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

async function validateEmail(email, checkIsRegisteredWithId=false) {
    if (!email) return {error: 'Email is required'};
    if (typeof(email) !== 'string') return {error: 'Email must be string'};

    email = email.trim().toLowerCase();

    if (!email) return {error: 'Email is required'};
    if (checkIsRegisteredWithId && await User.isEmailRegisteredWithId(email, checkIsRegisteredWithId)) return {error: 'Email is registered'};

    const emailRegex = /^(?!.*\.\.)(?!^\.)(?!.*\.$)(?!.*-$)(?!.*\.-)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)$/;
    if (!emailRegex.test(email)) return {error: 'Email is invalid'};

    return {email};
}

function validateRole(role) {
    if (!role) return {error: 'Role is required'};
    if (typeof(role) !== 'string') return {error: 'Role must be string'};

    role = role.trim().toLowerCase();

    if (!role) return {error: 'Role is required'};
    if (role !== 'admin' && role !== 'user') return {error: 'Role is invalid'};

    return {role};
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

function validateReason(reason) {
    if (reason === undefined) return {reason};
    if (typeof(reason) !== 'string') return {error: 'Reason must be string'};

    reason = reason.trim().replace(/\s+/g, ' ');

    if (reason.length > 50) return {error: 'Reason length exceeds 255 characters'};

    return {reason};
}

module.exports = {updateUser, changePwd, blacklist};