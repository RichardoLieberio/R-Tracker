const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userTempSchema = mongoose.Schema({
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
    expires_at: {
        type: Date,
        default: () => Date.now() + 15 * 60 * 1000,
        required: true,
        expires: 15 * 60
    }
});

userTempSchema.methods.register = async function(data, otp) {
    const {name, email, pwd: rawPwd} = data;
    const pwd = await bcrypt.hash(rawPwd, +process.env.SALT_ROUNDS);

    return this.constructor.findOneAndUpdate(
        {email},
        {name, email, pwd, otp, expires_at: Date.now() + 15 * 60 * 1000},
        {upsert: true, new: true}
    );
}

const UserTemp = mongoose.model('UserTemp', userTempSchema);

module.exports = UserTemp;