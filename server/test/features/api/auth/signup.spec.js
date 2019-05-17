const request = require('test/support/request');
const { expect } = require('chai');

describe('API :: POST /api/signup', () => {
  context('when sent data is ok', () => {
    it('creates and returns 201 and the new user', async () => {
      const { body } = await request()
        .post('/api/signup')
        .send({
          name: 'New User',
          email: 'test@ipragmatech.com',
          password: '123456'
        })
        .expect(201);

      expect(body.id).to.exist;
      expect(body.name).to.equal('New User');
      expect(body).to.have.all.keys('customerId', 'name', 'email');
    });
  });

  context('when name is missing', () => {
    it('does not create and returns 400 with the validation error', async () => {
      const { body } = await request()
        .post('/api/signup')
        .expect(400);

      expect(body.type).to.equal('ValidationError');
      expect(body.details).to.have.lengthOf(3);
      expect(body.details[0].message).to.equal('"name" is required');
    });
  });
});
