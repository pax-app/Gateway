import supertest from 'supertest';
import app from '../src/app';
const request = supertest(app);

describe('Pax', () => {
  it('Get if a chat has a linked pax to it', async () => {
    const res = await request.get('/api/v1/pax/consult_pax/1');
    expect(res.status).toBe(200);
    expect(res.body.exists).toBe('false');
  });

  it('Get all finalized pax from a provider', async () => {
    const res = await request.get('/api/v1/pax/finalized_pax/provider/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('pax');
  });

  it('Get all initiated pax from a provider', async () => {
    const res = await request.get('/api/v1/pax/initiated_pax/provider/1');
  });

  it('Get all cancelled pax from a provider', async () => {
    const res = await request.get('/api/v1/pax/canceled_pax/provider/1');
  });

  it('Get all pendent pax from a provider', async () => {
    const res = await request.get('/api/v1/pax/pendent_pax/provider/1');
  });

  it('Should upcreate a pax', async () => {
    const res = await request.post('/api/v1/pax/upCreate').send({
      date: '2019-09-20',
      description: 'Irei arrumar o display do celular Galaxy S8',
      name: 'Display pifado',
      price: 100.2,
      user_id: 2,
      provider_id: 1,
      chat_id: 7,
      address_id: 8,
    });
  });

  it('Should update a pax status', async () => {
    const res = await request.patch('/api/v1/pax/update_status').send({
      chat_id: 7,
      status: 'C',
    });
  });

  it('Should update cancellation motive', async () => {
    const res = await request.patch('/api/v1/pax/update_motive').send({
      chat_id: 7,
      canceled_motive:
        'Estou cancelando este serviço pois sofri um acidente de trabalho',
    });
  });
});
