const { expect } = require('chai');
const Signup = require('src/app/auth/Signup');

describe('App :: Auth :: Signup', () => {
  var signup;

  context('when user is valid', () => {
    before(() => {
      const MockCustomersRepository = {
        add: (user) => Promise.resolve(user)
      };

      signup = new Signup({
        customersRepository: MockCustomersRepository
      });
    });

    it('creates the user and emits SUCCESS', (done) => {
      const userData = { name: 'New User', email: 'new@email.com', password:'123456' };

      signup.on(signup.outputs.SUCCESS, (response) => {
        expect(response.name).to.equal('New User');
        done();
      });

      signup.execute(userData);
    });
  });

  context('when user is invalid', () => {
    before(() => {
      const MockCustomersRepository = {
        add: () => Promise.reject(Error('ValidationError'))
      };

      signup = new Signup({
        customersRepository: MockCustomersRepository
      });
    });

    it('emits VALIDATION_ERROR with the error', (done) => {
      const userData = { name: 'New User', email: 'new@email.com', password:'123456' };

      signup.on(signup.outputs.VALIDATION_ERROR, (response) => {
        expect(response.message).to.equal('ValidationError');
        done();
      });

      signup.execute(userData);
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockCustomersRepository = {
        add: () => Promise.reject(new Error('Some Error'))
      };

      signup = new Signup({
        customersRepository: MockCustomersRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      const userData = { name: 'New User', email: 'new@email.com', password:'123456' };

      signup.on(signup.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Some Error');
        done();
      });

      signup.execute(userData);
    });
  });
});
