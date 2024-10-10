const mongoose = require('mongoose');

function transactionHandler(handler) {
    return async function(req, res) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            req.transaction = session;
            await handler(req, res);

            await session.commitTransaction();
        } catch(error) {
            await session.abortTransaction();
        } finally {
            session.endSession();
        }
    }
}

module.exports = transactionHandler;