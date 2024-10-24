const mongoose = require('mongoose');

const changeEmailTokenSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    new_email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    otp: {
        type: String,
        trim: true,
        minLength: 4,
        maxLength: 10,
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

changeEmailTokenSchema.statics.addRequest = async function(user_id, new_email, otp) {
    await this.findOneAndUpdate({user_id}, {new_email, otp, created_at: Date.now(), expires_at: Date.now() + 15 * 60 * 1000}, {upsert: true});
}

changeEmailTokenSchema.statics.checkRequest = async function(user_id, new_email, otp, session) {
    return !!await this.findOneAndDelete({user_id, new_email, otp}, {session});
}

const ChangeEmailToken = mongoose.model('ChangeEmailToken', changeEmailTokenSchema);

module.exports = ChangeEmailToken;