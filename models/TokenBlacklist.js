const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const tokenBlacklistSchema = mongoose.Schema({
    token: {
        type: String,
        trim: true,
        required: true
    },
    token_expires_at: {
        type: Date,
        required: true
    },
    blacklisted_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});

tokenBlacklistSchema.statics.isTokenBlacklisted = async function(token) {
    return !!await this.findOne({token});
};

tokenBlacklistSchema.statics.blacklist = async function(rawAccessToken, rawRefreshToken) {
    const tokensToBlacklist = [];

    const accessToken = validateToken(rawAccessToken, process.env.ACCESS_TOKEN_SECRET);
    accessToken && tokensToBlacklist.push(accessToken);

    const refreshToken = validateToken(rawRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    refreshToken && tokensToBlacklist.push(refreshToken);

    tokensToBlacklist.length && await this.create(tokensToBlacklist);
}

function validateToken(token, secret) {
    try {
        const verifiedToken = jwt.verify(token, secret);
        return {token, token_expires_at: new Date(verifiedToken.exp * 1000)}
    } catch(error) {
        return null;
    }
}

const TokenBlacklist = mongoose.model('TokenBlacklist', tokenBlacklistSchema);

module.exports = TokenBlacklist;