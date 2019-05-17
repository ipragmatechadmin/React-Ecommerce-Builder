const { expect } = require('chai');
const Customer = require('src/domain/customer/Customer');

describe('Domain :: Customer', () => {
  describe('#isLegal', () => {
    context('when customer have invalid email', () => {
      it('returns false', () => {
        const customer = new Customer({ email: '123455' });

        expect(customer.isEmailValid()).to.be.false();
      });
    });

    context('when customer have valid email', () => {
      it('returns true', () => {
        const customer = new Customer({ email: 'kapil.jain@ipragmatech.com' });

        expect(customer.isEmailValid()).to.be.true();
      });
    });
  });
});
