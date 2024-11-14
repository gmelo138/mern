const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use(errorHandler);

module.exports = app;