//import Dotenv
require('dotenv').config();

const request = require('supertest');
const app = require('../api/index');
const PORT = 4001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

describe('Shirts API', () => {
  it('should get all shirts', async () => {
    const response = await request(app).get('/shirts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should add a new shirt', async () => {
    const newShirt = {
      name: 'Super Mom',
      description: 'A Mother nourishing her family',
      price: 16.99,
      category: 'Super Hero',
      inStock: true,
      quantity: 10,
    };
    const response = await request(app).post('/shirts').send(newShirt);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should get a shirt by ID', async () => {
    const shirtId = 1; // Replace with a valid ID
    const response = await request(app).get(`/shirts/${shirtId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', shirtId);
  });

  it('should update a shirt by ID', async () => {
    const shirtId = 1; // Replace with a valid ID
    const updatedShirt = {
      name: 'Super Dad',
      description: 'A Father nourishing his family',
      price: 18.99,
      category: 'Super Hero',
      inStock: true,
      quantity: 5,
    };
    const response = await request(app)
      .put(`/shirts/${shirtId}`)
      .send(updatedShirt);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Super Dad');
  });

  it('should delete a shirt by ID', async () => {
    const shirtId = 1; // Replace with a valid ID
    const response = await request(app).delete(`/shirts/${shirtId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Shirt deleted successfully'
    );
  });

  it('should return 404 for non-existing shirt ID', async () => {
    const shirtId = 9999; // Replace with a non-existing ID
    const response = await request(app).get(`/shirts/${shirtId}`);
    expect(response.status).toBe(404);
  });

  it('should return 400 for invalid add shirt request', async () => {
    const invalidShirt = {
      name: 'Incomplete Shirt',
    };
    const response = await request(app).post('/shirts').send(invalidShirt);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'message',
      'Please provide all required fields'
    );
  });

  it('should return 400 for invalid update shirt request', async () => {
    const shirtId = 1; // Replace with a valid ID
    const invalidShirt = {
      name: 'Incomplete Shirt',
    };
    const response = await request(app)
      .put(`/shirts/${shirtId}`)
      .send(invalidShirt);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'message',
      'Please provide all required fields'
    );
  });

  it('should return 404 for deleting non-existing shirt ID', async () => {
    const shirtId = 9999; // Replace with a non-existing ID
    const response = await request(app).delete(`/shirts/${shirtId}`);
    expect(response.status).toBe(404);
  });

  it('should return 500 for server error', async () => {
    jest.spyOn(supabaseInstance, 'get').mockImplementation(() => {
      throw new Error('Server error');
    });
    const response = await request(app).get('/shirts');
    expect(response.status).toBe(500);
  });
  // Close the server after all tests
  afterAll((done) => {
    server.close(done);
  });
});
