const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Standard middlewares
app.use(cors()); // Allow cross-origin requests from our mobile app
app.use(express.json()); // Parse incoming JSON request bodies

// Enable HTTP logging in development/production (skip in tests)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check root route to verify the API is running
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Women Safety Offline GPS + SMS App - Backend API is running.',
  });
});

module.exports = app;
