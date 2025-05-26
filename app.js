const express = require('express');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const traderRoutes = require('./routes/traderRoutes');
const user =require('./routes/user')
const stockRoutes = require("./routes/stockRoutes")
const indexRoutes = require('./routes/indexRoutes')
const bannerRoutes = require('./routes/bannerRoutes');
const bodyParser = require('body-parser');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/traders', traderRoutes);
app.use('/user',user)

app.use('/api/stocks', stockRoutes);
app.use('/api/indices', indexRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/notifications', notificationRoutes);


module.exports = app;