const mongoose = require('mongoose');

const pwdResetTokenSchema = mongoose.Schema({
    email: {
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

pwdResetTokenSchema.statics.addRequest = async function(email, otp) {
    await this.findOneAndUpdate({email}, {email, otp}, {upsert: true});
}

pwdResetTokenSchema.statics.checkRequest = async function(email, otp, session) {
    return !!await this.findOneAndDelete({email, otp}, {session});
}

const PwdResetToken = mongoose.model('PwdResetToken', pwdResetTokenSchema);

module.exports = PwdResetToken;