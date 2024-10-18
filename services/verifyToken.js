const jwt = require('jsonwebtoken');

const UserToken = require('../models/UserToken');

function verifyToken(token, secret) {
    return new Promise(function(resolve) {
        jwt.verify(token, secret, async function(error, decoded) {
            if (error) return resolve(null);
            resolve(await UserToken.isAuthenticationMatches(decoded.id, token) ? decoded.id : null);
        });
    });
}

module.exports = verifyToken;