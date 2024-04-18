import supertest from 'supertest';
import { createNewUser } from '../user';

describe('user handler', () => {
  it('should create a new user', async () => {
    const req = { body: { username: 'hello1', password: 'hi' } };
    const res = { json: jest.fn() };
    const next = jest.fn();
    await createNewUser(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ token: expect.any(String) });
    
  });
});
