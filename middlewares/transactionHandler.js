const mongoose = require('mongoose');

const TransactionError = require('../services/TransactionError');

function transactionHandler(handler) {
    return async function(req, res) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            req.mongooseSession = session;
            await handler(req, res);
            await session.commitTransaction();
        } catch(error) {
            await session.abortTransaction();
            error instanceof TransactionError ? res.json(error) : res.json({status: 400, msg: 'Transaction failed'});
        } finally {
            session.endSession();
        }
    }
}

module.exports = transactionHandler;