const csrf = require('csurf');

const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: true
    }
});

module.exports = csrfProtection;