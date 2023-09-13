import { randomUUID } from 'crypto';
import request from 'supertest';

const baseUrl = 'http://localhost:3000';
const dateTimeISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

describe('PUT /services/:id', () => {
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
        frequency: 'Daily',
      });
  })

  it('should update a Service and respond with 200 status', async () => {
    const res = await request(baseUrl)
      .put(`/services/${serviceId}`)
      .set('Content-Type', 'application/json')
      .send({
        name: 'Service X',
        price: {
          amount: 1000,
          currency: 'USD',
        },
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: serviceId,
      name: 'Service X',
      price: {
        amount: 1000,
        currency: 'USD',
      },
      frequency: 'Daily',
      createdAt: expect.stringMatching(dateTimeISO),
      updatedAt: expect.stringMatching(dateTimeISO),
    })
  })
})