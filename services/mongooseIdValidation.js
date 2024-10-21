const mongoose = require('mongoose');

function mongooseIdValidation(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = mongooseIdValidation;