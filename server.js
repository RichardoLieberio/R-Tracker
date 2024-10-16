require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const connectDB = require('./services/dbConnection');

const tokenRoutes = require('./routes/token');
const requestRoutes = require('./routes/request');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/token', tokenRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, function() {
    console.log(`Listening on port ${process.env.PORT}`);
});