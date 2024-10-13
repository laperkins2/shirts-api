require('dotenv').config();
const request = require('supertest');
const app = require('../api/index');
const supabase = require('../supabaseInstance');

jest.mock('../supabaseInstance');

let server;

// Setting up a test server before all tests
beforeAll((done) => {
  server = app.listen(4000, () => {
    console.log('Test server running on port 4000');
    done();
  });
});

// Closing the server after all tests
afterAll((done) => {
  server.close(done);
});

describe('Shirts API', () => {
  it('should get all shirts', async () => {
    // Mocking the Supabase response
    supabase.get.mockResolvedValue({
      data: [
        { id: 1, name: 'Shirt 1', description: 'Description 1' },
        { id: 2, name: 'Shirt 2', description: 'Description 2' },
      ],
    });

    const response = await request(app).get('/shirts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  it('should add a new shirt', async () => {
    const newShirt = {
      name: 'Super Mom',
      description: 'A Mother nourishing her family',
      price: 16.99,
      category: 'Super Hero',
      instock: true,
      quantity: 10,
    };

    // Mocking the Supabase response for adding a shirt
    supabase.post.mockResolvedValue({
      data: { id: 1, ...newShirt },
    });

    const response = await request(app).post('/shirts').send(newShirt);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should get a shirt by ID', async () => {
    const shirtId = 1;
    supabase.get.mockResolvedValue({
      data: [{ id: shirtId, name: 'Shirt 1' }],
    });

    const response = await request(app).get(`/shirts/${shirtId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', shirtId);
  });

  it('should update a shirt by ID', async () => {
    const shirtId = 1;
    const updatedShirt = {
      name: 'Super Dad',
      description: 'A Father nourishing his family',
      price: 18.99,
      category: 'Super Hero',
      instock: true,
      quantity: 5,
    };

    // Mocking the Supabase response for updating a shirt
    supabase.patch.mockResolvedValue({
      data: { ...updatedShirt, id: shirtId },
    });

    const response = await request(app)
      .put(`/shirts/${shirtId}`)
      .send(updatedShirt);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Super Dad');
  });

  it('should delete a shirt by ID', async () => {
    const shirtId = 1;

    // Mocking the Supabase response for deleting a shirt
    supabase.delete.mockResolvedValue({
      data: { message: 'Shirt deleted successfully' },
    });

    const response = await request(app).delete(`/shirts/${shirtId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Shirt deleted successfully'
    );
  });

  it('should return 404 for non-existing shirt ID', async () => {
    const shirtId = 9999;
    supabase.get.mockResolvedValue({ data: [] });

    const response = await request(app).get(`/shirts/${shirtId}`);
    expect(response.status).toBe(404);
  });
  it('should return 400 for invalid add shirt request', async () => {
    const invalidShirt = { name: 'Incomplete Shirt' };
    const response = await request(app).post('/shirts').send(invalidShirt);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'message',
      'Please provide all required fields'
    );
  });

  it('should return 400 for invalid update shirt request', async () => {
    const shirtId = 1;
    const invalidShirt = { name: 'Incomplete Shirt' };
    const response = await request(app)
      .put(`/shirts/${shirtId}`)
      .send(invalidShirt);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'message',
      'Please provide all required fields'
    );
  });
  // Return 404 for Invalid Shirt ID Format
  it('should return 404 for invalid shirt ID format', async () => {
    const invalidId = 'abc';
    const response = await request(app).get(`/shirts/${invalidId}`);
    expect(response.status).toBe(404);
  });

  it('should return 500 for server error', async () => {
    jest.spyOn(supabase, 'get').mockImplementation(() => {
      throw new Error('Server error');
    });
    const response = await request(app).get('/shirts');
    expect(response.status).toBe(500);
  });
});
