# Shirts API

This project provides a RESTful API for managing a collection of shirts. It allows users to perform CRUD operations: create, read, update, and delete shirt entries. The API is built using Express.js and connects to a Supabase backend.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Installation

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js (version 14.x or higher)
- npm or yarn for package management

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/shirts-api.git
   ```

2. Navigate to the project directory:

   ```sh
   cd shirts-api
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:

   ```env
   PORT=4000
   ADMIN_API_KEY=your_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the server:

   ```sh
   npm run start
   ```

   The server will run on [http://localhost:4000](http://localhost:4000).

## Usage

The API provides the following endpoints:

- **GET /shirts**: Retrieve all shirts.
- **GET /shirts/:id**: Retrieve a shirt by ID.
- **POST /shirts**: Add a new shirt.
- **PUT /shirts/:id**: Update an existing shirt by ID.
- **DELETE /shirts/:id**: Delete a shirt by ID.

### Example Requests

1. **Get All Shirts**

   ```sh
   curl -X GET http://localhost:4000/shirts -H "api-key: your_api_key"
   ```

2. **Add a New Shirt**

   ```sh
   curl -X POST http://localhost:4000/shirts -H "Content-Type: application/json" -H "api-key: your_api_key" -d '{"name": "New Shirt", "description": "Description", "price": 20.00, "category": "Casual", "instock": true, "quantity": 5, "image_url": "http://example.com/image.jpg"}'
   ```

3. **Get Shirt by ID**

   ```sh
   curl -X GET http://localhost:4000/shirts/1 -H "api-key: your_api_key"
   ```

4. **Update Shirt**

   ```sh
   curl -X PUT http://localhost:4000/shirts/1 -H "Content-Type: application/json" -H "api-key: your_api_key" -d '{"name": "Updated Shirt", "description": "Updated Description", "price": 22.00, "category": "Casual", "instock": true, "quantity": 5, "image_url": "http://example.com/image.jpg"}'
   ```

5. **Delete Shirt**

   ```sh
   curl -X DELETE http://localhost:4000/shirts/1 -H "api-key: your_api_key"
   ```

## Testing

This project includes tests using Jest and Supertest. To run the tests, execute:

```sh
npm test
```

### Test Cases

- Get all shirts
- Add a new shirt
- Get a shirt by ID
- Update a shirt by ID
- Delete a shirt by ID
- Handle errors for invalid requests and server issues

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Express.js documentation
- Supabase documentation
- Jest and Supertest for testing
- Node.js community
