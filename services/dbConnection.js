const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MODE === 'production' ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI_DEV);
        console.log('Database connected.');
    } catch(error) {
        console.error(`Database connection failed: ${error}`);
        process.exit(1);
    }
}

module.exports = connectDB;