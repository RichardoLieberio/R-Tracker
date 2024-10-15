const User = require('../models/User');
const InactiveUser = require('../models/InactiveUser');

async function verifyAccount(req, res) {
    const user = await InactiveUser.getAndRemove(req.params.token, req.mongooseSession);
}

module.exports = {verifyAccount};