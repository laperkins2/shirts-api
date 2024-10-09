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

// create an express application
const app = express();

// define a port
const PORT = 4000;

//Define our Middleware
// Use CORS
const corsOptions = {
  origin: 'http://localhost:4000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Use JSON middleware to parse request bodies
app.use(express.json());

// Define our Routes
// Home route
app.get('/', (request, response, next) => {
  response.json({ hello: 'World' });
});

// Route to get all shirts
app.get('/shirts', async (request, response, next) => {
  try {
    const res = await supabase.get('/shirts');
    response.json(res.data);
  } catch (error) {
    next(error);
  }
});

// Route to get single shirt
app.get('/shirts/:id', async (request, response, next) => {
  try {
    const res = await supabase.get(`/shirts?id=eq.${request.params.id}`);
    if (!res.data.length) {
      return response.status(404).json({ message: 'Shirts does"nt exist!' });
    }
    response.json(res.data[0]);
  } catch (error) {
    next(error);
  }
});

// Route to add shirts
app.post('/shirts', async (request, response, next) => {
  try {
    const { name, description, price, category, instock } = request.body;

    if (
      !name ||
      !description ||
      price == null ||
      !category ||
      instock == null
    ) {
      return response
        .status(400)
        .json({ message: 'Please provide all required fields' });
    }
    const newShirt = {
      // id: SHIRTS.length + 1,
      name,
      description,
      price,
      category,
      instock,
    };

    const { data } = await supabase.post('/shirts', newShirt);

    response.status(201).json(data);
  } catch (error) {
    console.error('Supabase Error:', error);
    response.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
});

// Route to update shirt
app.put('/shirts/:id', async (request, response, next) => {
  try {
    const { name, description, price, category, instock } = request.body;
    if (!name || !description || !price || !category || !instock) {
      return response
        .status(404)
        .json({ message: 'Please provide all required fields' });
    }

    const updateShirt = {
      name,
      description,
      price,
      category,
      instock,
    };
    const shirtId = request.params.id;

    const { data } = await supabase.patch(
      `/shirts?id=eq.${shirtId}`,
      updateShirt
    );

    // Send updated data back in response
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ message: 'Error updating shirt!', error });
  }
});

// Route to delete shirt
app.delete('/shirts/:id', async (request, response, next) => {
  try {
    const res = await supabase.delete(`/shirts?id=eq.${request.params.id}`);

    response.status(200).json(res.data);
  } catch (error) {
    next(error);
  }
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
  response.status(404).json({ error: 'Resource not found.' });
});

// Make the server listen on our port
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
