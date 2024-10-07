const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 30,
        required: true
    },
    email: {
        type: String,
        maxlength: 255,
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

const User = mongoose.model('User', userSchema);

module.exports = User;