const mongoose = require('mongoose');

const pwdResetTokenSchema = mongoose.Schema({
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

pwdResetTokenSchema.statics.createPath = function(userId, token) {
    return this.findOneAndUpdate({userId}, {userId, token}, {upsert: true});
}

const PwdResetToken = mongoose.model('PwdResetToken', pwdResetTokenSchema);

module.exports = PwdResetToken;