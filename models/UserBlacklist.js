const mongoose = require('mongoose');

const userBlacklistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    blacklisted_by: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blacklisted_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const UserBlacklist = mongoose.model('UserBlacklist', userBlacklistSchema);

module.exports = UserBlacklist;