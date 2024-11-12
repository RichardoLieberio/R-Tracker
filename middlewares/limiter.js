const rateLimit = require('express-rate-limit');

function limiter(max) {
    return rateLimit({
        windowMs: process.env.RATE_LIMIT_MINUTE * 60 * 1000,
        max,
        handler: function(req, res) {
            res.json({status: 429, msg: 'Too many requests. Please try again later.'});
        }
    });
}

module.exports = limiter;