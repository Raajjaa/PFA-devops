const request = require('supertest');
const express = require('express');
const router = require('./index');

const app = express();
app.use(router);

describe('Welcome Endpoint', () => {
  test('GET / should return "Welcome to the API !" message', async () => {
    const response = await request(app).get('/test');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Welcome to the API !' });
  });
});