const mongoose = require('mongoose');

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

const TokenBlacklist = mongoose.model('TokenBlacklist', tokenBlacklistSchema);

module.exports = TokenBlacklist;