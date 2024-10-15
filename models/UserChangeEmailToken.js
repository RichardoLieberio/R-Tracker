const mongoose = require('mongoose');

const userChangeEmailTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    newEmail: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
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
        required: true,
        expires: 15 * 60
    }
});

const UserChangeEmailToken = mongoose.model('UserChangeEmailToken', userChangeEmailTokenSchema);

module.exports = UserChangeEmailToken;