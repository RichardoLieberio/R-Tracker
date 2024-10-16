function login(req, res, next) {
    const {email, pwd, rememberMe} = req.body;
    const errorMsg = {};
    req.data = {};

    const emailValidation = validateEmail(email);
    emailValidation.error
    ? errorMsg['email'] = emailValidation.error
    : req.data['email'] = emailValidation.email;

    const pwdValidation = validatePwd(pwd);
    pwdValidation.error
    ? errorMsg['pwd'] = pwdValidation.error
    : req.data['pwd'] = pwdValidation.pwd;

    const rememberMeValidation = validateRememberMe(rememberMe);
    rememberMeValidation.error
    ? errorMsg['rememberMe'] = rememberMeValidation.error
    : req.data['rememberMe'] = rememberMeValidation.rememberMe;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
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

function validateRememberMe(rememberMe) {
    if (rememberMe === undefined) return {error: 'Remember Me is required'};
    if (typeof(rememberMe) !== 'boolean') return {error: 'Remember Me must be boolean'};
    return {rememberMe};
}

module.exports = {login};