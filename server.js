
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const apps = express();
dotenv.config();

const app = require('./app');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/gets", (req, res) => {
  res.json({ message: 'This is a public endpoint.' });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

