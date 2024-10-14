const mongoose = require('mongoose');

const userPwdResetTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    token: {
        type: String,
        trim: true,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    expires_at: {
        type: Date,
        default: () => Date.now() + 15 * 60 * 1000,
        required: true
    }
});

const UserPwdResetToken = mongoose.model('UserPwdResetToken', userPwdResetTokenSchema);

module.exports = UserPwdResetToken;