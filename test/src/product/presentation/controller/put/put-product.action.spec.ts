import { randomUUID } from 'crypto';
import request from 'supertest';

const baseUrl = 'http://localhost:3000';
const dateTimeISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

describe('PUT /products/:id', () => {
  const productId = randomUUID();

  beforeEach(() => {
    return request(baseUrl)
      .post('/products')
      .set('Content-Type', 'application/json')
      .send({
        id: productId,
        name: 'Product 1',
        price: {
          amount: 1500,
          currency: 'EUR',
        },
        'stock': 15,
      });
  })

  it('should update a Product and respond with 200 status', async () => {
    const res = await request(baseUrl)
      .put(`/products/${productId}`)
      .set('Content-Type', 'application/json')
      .send({
        name: 'Product X',
        price: {
          amount: 1000,
          currency: 'USD',
        },
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: productId,
      name: 'Product X',
      price: {
        amount: 1000,
        currency: 'USD',
      },
      'stock': 15,
      createdAt: expect.stringMatching(dateTimeISO),
      updatedAt: expect.stringMatching(dateTimeISO),
    })
  })
})