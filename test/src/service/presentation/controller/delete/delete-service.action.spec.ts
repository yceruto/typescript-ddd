import { randomUUID } from 'crypto';
import request from 'supertest';

const baseUrl = 'http://localhost:3000';

describe('DELETE /services/:id', () => {
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

  it('should delete a Service and respond with 204 status', async () => {
    const res = await request(baseUrl)
      .delete(`/services/${serviceId}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(204);
  })

  it('should respond with 404 status when Service not found', async () => {
    const unknownServiceId = randomUUID();
    const res = await request(baseUrl)
      .delete(`/services/${unknownServiceId}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      message: `Service with id ${unknownServiceId} not found`,
    })
  })
})