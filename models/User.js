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

userSchema.statics.isEmailRegisteredWithId = async function(email, _id) {
    return !!await this.findOne({_id: {$ne: _id}, email});
}

userSchema.statics.isAdmin = async function(_id) {
    return !!await this.findOne({_id, role: 'admin'});
}

userSchema.statics.addNewAccount = async function(data, session) {
    await this.create([data], {session});
}

userSchema.statics.resetPwd = async function(email, rawPwd, session) {
    const pwd = await bcrypt.hash(rawPwd, +process.env.SALT_ROUNDS);
    return await this.findOneAndUpdate({email}, {pwd, updated_at: Date.now()}, {session});
}

userSchema.statics.getInfo = async function(id) {
    return await this.findById(id).select('name email role created_at updated_at');
}

userSchema.statics.changeName = async function(_id, name) {
    await this.findOneAndUpdate({_id}, {name, updated_at: Date.now()});
}

userSchema.statics.changeEmail = async function(_id, email, session) {
    await this.findOneAndUpdate({_id}, {email, updated_at: Date.now()}, {session});
}

userSchema.statics.changePwd = async function(_id, rawPwd) {
    const pwd = await bcrypt.hash(rawPwd, +process.env.SALT_ROUNDS);
    await this.findOneAndUpdate({_id}, {pwd, updated_at: Date.now()});
}

userSchema.statics.deleteAccount = async function(id, session) {
    return await this.findByIdAndDelete(id, {session});
}

userSchema.statics.getAllUsers = async function() {
    return await this.find({}, {pwd: 0});
}

userSchema.statics.updateUser = async function(_id, data, session) {
    return await this.findOneAndUpdate({_id}, data, {session});
}

userSchema.statics.changePwdByAdmin = async function(_id, rawPwd, session) {
    const pwd = await bcrypt.hash(rawPwd, +process.env.SALT_ROUNDS);
    return !!await this.findOneAndUpdate({_id}, {pwd, updated_at: Date.now()}, {session});
}

userSchema.statics.whitelist = async function(_id) {
    return !!await this.findOneAndUpdate({_id}, {$unset: {blacklisted: '', blacklist_reason: '', blacklisted_by: '', blacklisted_at: ''}});
}

userSchema.statics.blacklist = async function(_id, blacklist_reason, blacklisted_by, session) {
    return !!await this.findOneAndUpdate({_id}, {blacklisted: true, blacklist_reason, blacklisted_by, blacklisted_at: Date.now()}, {session});
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