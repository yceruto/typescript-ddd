import { randomUUID } from 'crypto';
import request from 'supertest';

const baseUrl = 'http://localhost:3000';
const dateTimeISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

describe('GET /services', () => {
  const serviceId = randomUUID();

  beforeEach(() => {
    return request(baseUrl)
      .post('/services')
      .set('Content-Type', 'application/json')
      .send({
        id: serviceId,
        name: 'Service 1',
        price: {
          amount: 1500,
          currency: 'EUR',
        },
        availability: 15,
      });
  })  

  it('should get a Service and respond with 200 status', async () => {
    const res = await request(baseUrl)
      .get(`/services`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body).toContainEqual({
      id: serviceId,
      name: 'Service 1',
      price: {
        amount: 1500,
        currency: 'EUR',
      },
      availability: 15,
      createdAt: expect.stringMatching(dateTimeISO),
    })
  })
})