import { randomUUID } from 'crypto';
import request from 'supertest';

const baseUrl = 'http://localhost:3000';
const dateTimeISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

describe('POST /services', () => {
  const serviceId = randomUUID();

  it('should create a new Service and respond with 201 status', async () => {
    const res = await request(baseUrl)
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

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
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

  it('should respond with 400 status when body is missing', async () => {
    const res = await request(baseUrl)
      .post('/services')
      .set('Content-Type', 'application/json')
      .send();

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: 'Unexpected end of JSON input',
    })
  })

  it('should respond with 400 status when body is empty', async () => {
    const res = await request(baseUrl)
      .post('/services')
      .set('Content-Type', 'application/json')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: 'Error on typia.assertParse(): invalid type on $input.id, expect to be string',
    })
  })
})