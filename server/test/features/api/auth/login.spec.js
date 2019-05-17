const request = require('test/support/request');
const { expect } = require('chai');

describe('API :: POST /api/login', () => {
  context('when sent data is unauthorized', () => {
    it('Returns 401 with the validation error', async () => {
      const { body } = await request()
        .post('/api/login')
        .send({
          email: 'test@ipragmatech.com',
          password: '123456'
        })
        .expect(401);
    });
  });

  context('when Credentials Are missing', () => {
    it('Does not authenticae and returns 400', async () => {
      const { body } = await request()
        .post('/api/login')
        .expect(400);
    });
  });
});
