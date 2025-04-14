const router = require('express').Router();
const apiRoutes = require('./api');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const { apiURL } = keys.app;

const api = `/${apiURL}`;

// Welcome route
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API !' });
});


// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Welcome to the API !' });
});


// Health check endpoint
router.get("/health", async (req, res) => {
    try {
      // Perform a simple database operation to check database health.
      await mongoose.connection.db.admin().ping();
      res.status(200).json({
        status: "UP",
        message: "App is running smoothly...",
        database: "Connected",
      });
    } catch (err) {
      res.status(500).json({
        status: "DOWN",
        message: "App or Database is experiencing issues...",
        database: "Disconnected",
      });
    }
  });
  

  
// api routes
router.use(api, apiRoutes);
router.use(api, (req, res) => res.status(404).json('No API route found'));

module.exports = router;
