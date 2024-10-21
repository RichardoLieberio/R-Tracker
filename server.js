require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./services/dbConnection');
const sizeLimiter = require('./middlewares/sizeLimiter');

const tokenRoutes = require('./routes/token');
const requestRoutes = require('./routes/request');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');

connectDB();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(sizeLimiter);
app.use(express.json({limit: `${process.env.ACCEPT_JSON_MAX_SIZE_IN_MB}mb`}));

app.use('/api/token', tokenRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/expense', expenseRoutes);

app.listen(process.env.PORT, function() {
    console.log(`Listening on port ${process.env.PORT}`);
});