require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/foods', require('./routes/food'));
app.use('/api/categories', require('./routes/category'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/users', require('./routes/user'));
app.use('/api/users', require('./routes/userAdmin'));

// Simple health check
app.get('/api/ping', (req, res) => res.send('pong'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
