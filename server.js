require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const connectDB = require('./services/dbConnection');
const tokenRoutes = require('./routes/token');
const registerRoutes = require('./routes/register');
const userRoutes = require('./routes/user');

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/token', tokenRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/user', userRoutes);

app.listen(process.env.PORT, function() {
    console.log(`Listening on port ${process.env.PORT}`);
});