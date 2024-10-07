require('dotenv').config()
const express = require('express');

const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());

app.use('/api/user/', userRoutes);

app.listen(process.env.PORT, function () {
    console.log(`Listening on port ${process.env.PORT}`);
});