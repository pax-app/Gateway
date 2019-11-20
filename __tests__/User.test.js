import supertest from 'supertest';
import app from '../src/app';
const request = supertest(app);

describe('User', () => {
  jest.setTimeout(30000);

  it('Should get user sorted by review', async () => {
    const res = await request.get('/api/v1/user/provider_by_category/review/1');
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('provider_id');
  });

  it('Should get user sorted by minimum price', async () => {
    const res = await request.get(
      '/api/v1/user/provider_by_category/min_price/1'
    );
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('provider_id');
  });

  it('Should get single address with address id', async () => {
    const res = await request.get('/api/v1/user/get_address/2');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('address_id');
  });

  it('Should get all addresses from a user', async () => {
    const res = await request.get('/api/v1/user/get_addresses/2');
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('address_id');
  });

  it('Should get all addresses from a user', async () => {
    const res = await request.get('/api/v1/user/get_addresses/2');
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('address_id');
  });

  it('Should delete a provider relationship with a category', async () => {
    const res = await request.delete('/api/v1/user/1/category_provider/1');
  });

  it('Should create an address ', async () => {
    const res = await request.post('/api/v1/user/add_address').send({
      user_id: 1,
      street: 'Quadra 19 Conjunto T',
      neighborhood: 'Setor Norte (Gama)',
      number: 2,
      city: 'Brasília',
      cep: 72536201,
      state: 'DF',
      complement: 'calcalclaclc',
      reference_point: 'asdoaksdoaksdoaskd',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Address registered');
  });

  it('Should create an user ', async () => {
    const res = await request.post('/api/v1/user/auth/registration').send({
      name: Math.random()
        .toString(36)
        .substring(7),
      email: `${Math.random()
        .toString(36)
        .substring(7)}@gmail.com`,
      cpf: '00190816199',
      password: 'aaaaaa',
      url_avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('User was created');
  });

  it('Should log user in', async () => {
    const res = await request.post('/api/v1/user/auth/login').send({
      email: 'youssef@gmail.com',
      password: 'aaaaaa',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('auth_token');
  });
});
