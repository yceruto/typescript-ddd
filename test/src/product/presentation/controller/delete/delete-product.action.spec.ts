import { randomUUID } from 'crypto';
import request from 'supertest';

const baseUrl = 'http://localhost:3000';

describe('DELETE /products/:id', () => {
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

  it('should delete a Product and respond with 204 status', async () => {
    const res = await request(baseUrl)
      .delete(`/products/${productId}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(204);
  })

  it('should respond with 404 status when Product not found', async () => {
    const unknownProductId = randomUUID();
    const res = await request(baseUrl)
      .delete(`/products/${unknownProductId}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      message: `Product with id ${unknownProductId} not found`,
    })
  })
})