const mongoose = require('mongoose');

const userTokenSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    refresh_token: {
        type: String,
        trim: true,
        required: true
    },
    refresh_token_created_at: {
        type: Date,
        required: true
    },
    access_token: {
        type: String,
        trim: true,
        required: true
    },
    access_token_created_at: {
        type: Date,
        required: true
    }
});

const UserToken = mongoose.model('UserToken', userTokenSchema);

module.exports = UserToken;