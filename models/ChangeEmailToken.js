const mongoose = require('mongoose');

const changeEmailTokenSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    token: {
        type: String,
        trim: true,
        minLength: 32,
        maxLength: 32,
        required: true
    },
    new_email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
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

changeEmailTokenSchema.statics.createPath = function(userId, newEmail, token) {
    return this.findOneAndUpdate({userId}, {userId, newEmail, token}, {upsert: true});
}

const ChangeEmailToken = mongoose.model('ChangeEmailToken', changeEmailTokenSchema);

module.exports = ChangeEmailToken;