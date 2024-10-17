require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const connectDB = require('./services/dbConnection');
const dataCleanUp = require('./services/dataCleanUp');

const tokenRoutes = require('./routes/token');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

connectDB();
dataCleanUp();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/token', tokenRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, function() {
    console.log(`Listening on port ${process.env.PORT}`);
});