const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const inactiveUserSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    pwd: {
        type: String,
        minLength: 6,
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

inactiveUserSchema.statics.register = async function(data, otp) {
    const {name, email, pwd: rawPwd} = data;
    const pwd = await bcrypt.hash(rawPwd, +process.env.SALT_ROUNDS);
    await this.findOneAndUpdate({email}, {name, email, pwd, otp, created_at: Date.now(), expires_at: Date.now() + 15 * 60 * 1000}, {upsert: true});
}

inactiveUserSchema.statics.verify = async function(data, session) {
    return await this.findOneAndDelete(data, {session}).select('name email pwd');
}

const InactiveUser = mongoose.model('InactiveUser', inactiveUserSchema);

module.exports = InactiveUser;