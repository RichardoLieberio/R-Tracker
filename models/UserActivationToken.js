require('dotenv').config();
const mongoose = require('mongoose');

const userActivationTokenSchema = mongoose.Schema({
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

const UserActivationToken = mongoose.model('UserActivationToken', userActivationTokenSchema);

module.exports = UserActivationToken;