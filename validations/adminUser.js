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

async function changePwd(req, res, next) {
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

function validateReason(reason) {
    if (reason === undefined) return {reason};
    if (typeof(reason) !== 'string') return {error: 'Reason must be string'};

    reason = reason.trim().replace(/\s+/g, ' ');

    if (reason.length > 50) return {error: 'Reason length exceeds 255 characters'};

    return {reason};
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

module.exports = {blacklist, changePwd};