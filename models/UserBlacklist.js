const mongoose = require('mongoose');

const userBlacklistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    reason: {
        type: String,
        trim: true,
        required: true
    },
    blacklisted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
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