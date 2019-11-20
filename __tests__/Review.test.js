import supertest from 'supertest';
import app from '../src/app';
const request = supertest(app);

describe('Category', () => {
  jest.setTimeout(30000);

  it('Should get service review average from a provider', async () => {
    const res = await request.get('/api/v1/review/service_reviews/average/1');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toBe('success');
    expect(res.body['provider_id']).toBe('1');
  });

  it('Should get charisma review average for an user', async () => {
    const res = await request.get('/api/v1/review/charisma_reviews/average/1');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toBe('success');
    expect(res.body['user_id']).toBe('1');
  });

  it('Should create a review', async () => {
    const res = await request.post('/api/v1/review/create_review').send({
      service_review: {
        charisma_rate: '3',
        service_rate: '5',
        commentary: 'Serviço muito bom!',
        evaluator_id: 1,
        evaluated_id: 1,
      },
    });
  });
});
