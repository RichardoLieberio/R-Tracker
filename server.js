require('dotenv').config();
const express = require('express');
const connectDB = require('./services/dbConnection');

connectDB();

const registerRoutes = require('./routes/register');

const app = express();

app.use(express.json());

app.use('/api/register/', registerRoutes);

app.listen(process.env.PORT, function() {
    console.log(`Listening on port ${process.env.PORT}`);
});