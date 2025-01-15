const csrf = require('csurf');

const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        maxAge: 3600,
        secure: process.env.MODE === 'production',
        sameSite: process.env.MODE === 'production' ? 'Lax' : 'Strict'
    }
});

module.exports = csrfProtection;