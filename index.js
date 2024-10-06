// Import Express
const express = require('express');

// Import CORS
const cors = require('cors');

// create an express application
const app = express();

// define a port
const PORT = 4000;

//Define our Middleware
// Use CORS
app.use(cors());

// Use JSON middleware to parse request bodies
app.use(express.json());

// Define our Routes
app.get('/', (request, response, next) => {
  response.json({ hello: 'World' });
});

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
  response.status(400).json({ error: 'Resource not found.' });
});

// Make the server listen on our port
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
