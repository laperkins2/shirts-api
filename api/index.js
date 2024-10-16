//Import dotenv
require('dotenv').config();

// Import Express
const express = require('express');

// Import CORS
const cors = require('cors');

// Import axios
const axios = require('axios');

// Import supabase Instance
const supabase = require('../supabaseInstance');

//import route functions
const getAll = require('./routes/getAll');
const getAdd = require('./routes/getAdd');
const getById = require('./routes/getById');
const getUpdate = require('./routes/getUpdate');
const getDelete = require('./routes/getDelete');

// create an express application
const app = express();

// define a port
const PORT = process.env.PORT;

//Define our Middleware
// Use CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Use JSON middleware to parse request bodies
app.use(express.json());

// Middleware for api key security
app.use((request, response, next) => {
  const apiKey = request.headers['api-key'];

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return response
      .status(403)
      .json({ message: 'ACCESS DENIED! Need api key!' });
  }
  next();
});

// Define our Routes
// Home route
app.get('/', (request, response, next) => {
  response.json({ hello: 'World' });
});

// Route to get all shirts
app.get('/shirts', getAll);

// Route to get single shirt
app.get('/shirts/:id', getById);

// Route to add shirts
app.post('/shirts', getAdd);

// Route to update shirt
app.put('/shirts/:id', getUpdate);

// Route to delete shirt
app.delete('/shirts/:id', getDelete);

// Error Handling
// Generic Error Handling
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).json({
    error: 'Sorry you reach this by mistake!',
    errorStack: error.stack,
    errorMessage: error.message,
  });
});

// 404 Resource not found Error Handling
app.use((request, response, next) => {
  response.status(404).json({ error: 'Resource not found.' });
});

//Export the app for testing
module.exports = app;

// Make the server listen on our port
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
  });
}
