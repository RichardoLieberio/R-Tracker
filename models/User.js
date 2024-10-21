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
    },
    blacklisted: {
        type: Boolean
    },
    blacklist_reason: {
        type: String,
        maxlength: 255,
        trim: true
    },
    blacklisted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true
    },
    blacklisted_at: {
        type: Date
    }
});

userSchema.statics.isEmailRegistered = async function(email) {
    return !!await this.findOne({email});
}

userSchema.statics.addNewAccount = async function(data, session) {
    await this.create([data], {session});
}

userSchema.statics.resetPwd = async function(email, rawPwd, session) {
    const pwd = await bcrypt.hash(rawPwd, +process.env.SALT_ROUNDS);
    await this.findOneAndUpdate({email}, {pwd}, {session});
}

userSchema.statics.getInfo = async function(id) {
    return await this.findById(id).select('name email role created_at updated_at');
}

userSchema.statics.changeName = async function(_id, name) {
    await this.findOneAndUpdate({_id}, {name});
}

userSchema.statics.changeEmail = async function(_id, email, session) {
    await this.findOneAndUpdate({_id}, {email}, {session});
}

userSchema.statics.changePwd = async function(_id, rawPwd) {
    const pwd = await bcrypt.hash(rawPwd, +process.env.SALT_ROUNDS);
    await this.findOneAndUpdate({_id}, {pwd});
}

userSchema.methods.checkCredentials = async function(data) {
    const user = await this.constructor.findOne({email: data.email});
    if (!user) return false;

    return await bcrypt.compare(data.pwd, user.pwd) ? user : false;
}

userSchema.methods.isPwdMatches = async function(_id, pwd) {
    const user = await this.constructor.findOne({_id});
    if (!user) return false;

    return await bcrypt.compare(pwd, user.pwd) ? true : false;
}

const User = mongoose.model('User', userSchema);

module.exports = User;