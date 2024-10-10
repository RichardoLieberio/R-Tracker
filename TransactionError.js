class TransactionError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = TransactionError;