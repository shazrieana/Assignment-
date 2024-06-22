require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const userRoutes = require('./routes/user');
const gameRoutes = require('./routes/game');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Routes
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

// Test Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Serve the frontend
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


