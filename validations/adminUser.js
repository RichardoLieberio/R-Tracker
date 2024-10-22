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

module.exports = {changePwd};