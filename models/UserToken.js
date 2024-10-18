const mongoose = require('mongoose');

const userTokenSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    refresh_token: {
        type: String,
        trim: true,
        required: true
    },
    refresh_token_created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    access_token: {
        type: String,
        trim: true,
        required: true
    },
    access_token_created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});

userTokenSchema.statics.isAuthenticationMatches = async function(user_id, token) {
    return !!await this.findOne({user_id, $or: [{access_token: token}, {refresh_token: token}]});
}

userTokenSchema.statics.login = async function(user_id, refresh_token, access_token) {
    await this.findOneAndUpdate({user_id}, {refresh_token, access_token}, {upsert: true});
}

userTokenSchema.statics.logout = async function(user_id) {
    await this.findOneAndUpdate({user_id}, {refresh_token: '', access_token: ''}, {upsert: true});
}

const UserToken = mongoose.model('UserToken', userTokenSchema);

module.exports = UserToken;