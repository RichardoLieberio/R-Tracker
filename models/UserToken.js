const mongoose = require('mongoose');

const userTokenSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
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
    }
});

userTokenSchema.statics.isAuthenticationMatches = async function(user_id, token) {
    return !!await this.findOne({user_id, $or: [{access_token: token}, {refresh_token: token}]});
}

userTokenSchema.statics.resetAccessToken = async function(user_id, access_token) {
    await this.findOneAndUpdate({user_id}, {access_token, access_token_created_at: Date.now()}, {upsert: true});
}

userTokenSchema.statics.login = async function(user_id, access_token, refresh_token) {
    await this.findOneAndUpdate({user_id}, {access_token, access_token_created_at: Date.now(), refresh_token, refresh_token_created_at: Date.now()}, {upsert: true});
}

userTokenSchema.statics.logout = async function(access_token, refresh_token) {
    await this.findOneAndUpdate({$or: [{access_token}, {refresh_token}]}, {refresh_token: '', access_token: ''});
}

userTokenSchema.statics.clearToken = async function(user_id, session=null) {
    const options = session ? {session} : {};
    await this.findOneAndUpdate({user_id}, {access_token: '', refresh_token: ''}, options);
}

userTokenSchema.statics.deleteAccount = async function(user_id, session) {
    await this.findOneAndDelete({user_id}, {session});
}

const UserToken = mongoose.model('UserToken', userTokenSchema);

module.exports = UserToken;