const cron = require('node-cron');

const TokenBlacklist = require('../models/TokenBlacklist');

function dataCleanUp() {
    cron.schedule('*/15 * * * *', async function() {
        try {
            const result = await TokenBlacklist.cleanUp();
            console.log(`Cleaned up ${result.deletedCount} expired tokens`);
        } catch(error) {
            console.error(`Error during token cleanup : ${error}`);
        }
    });
}

module.exports = dataCleanUp;