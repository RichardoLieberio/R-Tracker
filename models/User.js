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

userSchema.statics.isEmailRegistered = function(email) {
    return this.findOne({email});
}

userSchema.methods.register = async function(data) {
    const saltRounds = 10;
    const hashedPwd = await bcrypt.hash(data.pwd, saltRounds);

    this.name = data.name;
    this.email = data.email;
    this.pwd = hashedPwd;

    return this.save();
}

const User = mongoose.model('User', userSchema);

module.exports = User;