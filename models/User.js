const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
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
    role: {
        type: String,
        trim: true,
        lowercase: true,
        enum: ['admin', 'user'],
        default: 'user',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_at: {
        type: Date
    }
});

userSchema.statics.isEmailRegistered = async function(email) {
    return !!await this.findOne({email});
}

userSchema.statics.addNewAccount = async function(data, session) {
    await this.create([data], {session});
}

userSchema.statics.changePwd = async function(email, rawPwd, session) {
    const pwd = await bcrypt.hash(rawPwd, +process.env.SALT_ROUNDS);
    return !!await this.findOneAndUpdate({email}, {pwd}, {session});
}

userSchema.methods.checkCredentials = async function(data) {
    const user = await this.constructor.isEmailRegistered(data.email);
    if (!user) return false;

    const {_id: id, role} = user;

    return await bcrypt.compare(data.pwd, user.pwd)
    ? {id, role}
    : false;
}

const User = mongoose.model('User', userSchema);

module.exports = User;