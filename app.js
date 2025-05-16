const express = require('express');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const traderRoutes = require('./routes/traderRoutes');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/traders', traderRoutes);
module.exports = app;