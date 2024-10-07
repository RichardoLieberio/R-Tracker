require('dotenv').config();
const mongoose = require('mongoose');

const userPwdResetTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    expires_at: {
        type: Date,
        required: true
    }
});

const UserPwdResetToken = mongoose.model('UserPwdResetToken', userPwdResetTokenSchema);

module.exports = UserPwdResetToken;