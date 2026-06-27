require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');

// Connect to MongoDB database
connectDB();

// Determine Port
const PORT = process.env.PORT || 5000;

// Listen for connections
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g. database fails asynchronously)
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
