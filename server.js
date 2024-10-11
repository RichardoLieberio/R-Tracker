require('dotenv').config();
const express = require('express');
const connectDB = require('./services/dbConnection');

connectDB();

const tokenRoutes = require('./routes/token');
const registerRoutes = require('./routes/register');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());

app.use('/api/token', tokenRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/user', userRoutes);

app.listen(process.env.PORT, function() {
    console.log(`Listening on port ${process.env.PORT}`);
});