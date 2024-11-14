const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
connectDB();

// Route files
const [entity]Routes = require('./routes/[entity]Routes');

app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/v1/users', [entity]Routes);

app.use(errorHandler);

module.exports = app;