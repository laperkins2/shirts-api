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

const SHIRTS = [
  {
    id: 1,
    name: 'Spider Man',
    description: 'A web shooting man in a spandex suit!',
    price: 15.99,
    category: 'Super Hero',
    inStock: true,
  },
  {
    id: 2,
    name: 'Basketball Ballers',
    description: 'A shirt with basketball greats.',
    price: 21.99,
    category: 'Sports',
    inStock: true,
  },
  {
    id: 3,
    name: 'Football Life',
    description: 'A Receiver making a catch.',
    price: 21.99,
    category: 'Sports',
    inStock: true,
  },
  {
    id: 4,
    name: 'Batwoman',
    description: 'Colorful and cheery woman in a bat suit.',
    price: 2.19,
    category: 'Super Hero',
    inStock: true,
  },
  {
    id: 5,
    name: "It's, it's, it's GONE!",
    description: 'A homerun leaving the ballpark.',
    price: 17.99,
    category: 'Sports',
    inStock: true,
  },
  {
    id: 6,
    name: 'GOOOOOAAALLL',
    description: 'A soccer player scoring a goal.',
    price: 18.99,
    category: 'Sports',
    inStock: true,
  },
  {
    id: 7,
    name: 'Might Dogs',
    description: 'A group of dogs fighting crime.',
    price: 22.99,
    category: 'Super Hero',
    inStock: true,
  },
  {
    id: 8,
    name: 'Night Owl',
    description: 'A Owl fighting crime during the night.',
    price: 16.99,
    category: 'Super Hero',
    inStock: true,
  },
  {
    id: 9,
    name: 'Energy Blaster',
    description: 'High-octane energy blaster used by Electro man.',
    price: 14.99,
    category: 'Super Hero',
    inStock: true,
  },
  {
    id: 10,
    name: 'Dive and dig',
    description: 'A great defensive move by a volleyball player.',
    price: 19.99,
    category: 'Sports',
    inStock: true,
  },
];

// Define our Routes
// Home route
app.get('/', (request, response, next) => {
  response.json({ hello: 'World' });
});

// Route to get all shirts
app.get('/shirts', (request, response, next) => {
  try {
    response.json(SHIRTS);
  } catch (error) {
    next(error);
  }
});

// Route to get single shirt
app.get('/shirts/:id', (request, response, next) => {
  try {
    const findShirt = SHIRTS.find((value) => {
      return value.id === parseInt(request.params.id);
    });

    if (!findShirt) {
      return response.status(404).json({ message: "Shirts does't exist!" });
    }
    response.json(findShirt);
  } catch (error) {
    next(error);
  }
});

// Route to add shirts
app.post('/shirts', (request, response, next) => {
  try {
    const { name, description, price, category, inStock } = request.body;
    if (!name || !description || !price || !category || !inStock) {
      return response
        .status(400)
        .json({ message: 'Please provide all required fields' });
    }
    const newShirt = {
      id: SHIRTS.length + 1,
      name,
      description,
      price,
      category,
      inStock,
    };
    SHIRTS.push(newShirt);
    response.status(201).json(newShirt);
  } catch (error) {
    next(error);
  }
});

// Route to update shirt
app.put('/shirts/:id', (request, response, next) => {
  try {
    const findShirt = SHIRTS.find((value) => {
      return value.id === parseInt(request.params.id);
    });

    const { name, description, price, category, inStock } = request.body;
    if (!name || !description || !price || !category || !inStock) {
      return response
        .status(400)
        .json({ message: 'Please provide all required fields' });
    }

    // set object values sent to request body
    findShirt.name = name;
    findShirt.description = description;
    findShirt.price = price;
    findShirt.category = category;
    findShirt.inStock = inStock;

    //send update back in response
    response.json(findShirt);
  } catch (error) {
    next(error);
  }
});

// Route to delete shirt
app.delete('/shirts/:id', (request, response, next) => {
  try {
    const shirtId = parseInt(request.params.id);
    const shirtIndex = SHIRTS.findIndex((shirt) => shirt.id === shirtId);

    if (shirtIndex === -1) {
      return response.status(404).json({ message: 'Shirt is not found!' });
    }

    SHIRTS.splice(shirtIndex, 1);
    response.status(200).json({ message: 'Shirt was deleted!' });
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
  response.status(400).json({ error: 'Resource not found.' });
});

// Make the server listen on our port
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
