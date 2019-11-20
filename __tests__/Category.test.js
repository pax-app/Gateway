import supertest from 'supertest';
import app from '../src/app';
const request = supertest(app);

describe('Category', () => {
  jest.setTimeout(30000);

  it('Should return success status when getting all general categories', async () => {
    const res = await request.get('/api/v1/category/general');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toBe('success');
  });

  it('Should return all general categories', async () => {
    const res = await request.get('/api/v1/category/general');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('categories');
  });

  it('Should return success status when getting all provider categories', async () => {
    const res = await request.get('/api/v1/category/provider');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toBe('success');
  });

  it('Should return all provider categories', async () => {
    const res = await request.get('/api/v1/category/provider');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('categories');
  });

  it('Should return all provider categories from a general category', async () => {
    const res = await request.get('/api/v1/category/provider/1');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('categories');
  });
});
