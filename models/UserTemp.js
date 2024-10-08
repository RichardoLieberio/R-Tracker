require('dotenv').config();
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
        minLength: process.env.OTP_LENGTH,
        maxLength: process.env.OTP_LENGTH,
        required: true
    },
    expires_at: {
        type: Date,
        default: Date.now,
        required: true,
        expires: 30
        // expires: 60 * process.env.OTP_LIFETIME_IN_MIN
    }
});

userTempSchema.methods.register = async function(data, otp) {
    const {name, email, pwd} = data;
    const hashedPwd = await bcrypt.hash(pwd, process.env.SALT_ROUNDS);

    this.name = name;
    this.email = email;
    this.pwd = hashedPwd;
    this.otp = otp;

    return this.save();
}

const UserTemp = mongoose.model('UserTemp', userTempSchema);

module.exports = UserTemp;