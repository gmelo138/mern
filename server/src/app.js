const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
connectDB();

// Route files
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);

module.exports = app;