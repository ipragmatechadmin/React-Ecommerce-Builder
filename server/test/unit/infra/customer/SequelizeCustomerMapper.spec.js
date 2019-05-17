const { expect } = require('chai');
const Customer = require('src/domain/customer/Customer');
const SequelizeCustomerMapper = require('src/infra/customer/SequelizeCustomerMapper');

describe('Infra :: Customer :: SequelizeCustomerMapper', () => {
  describe('.toEntity', () => {
    it('returns customer instance with passed attributes', () => {
      const mockedSequelizeCustomer = {
        dataValues: {
          customer_id: 321,
          name: 'The Customer',
          email: 'test@ipragmatech.com',
        }
      };

      const entity = SequelizeCustomerMapper.toEntity(mockedSequelizeCustomer);

      expect(entity).to.be.instanceOf(Customer);
      expect(entity.customer_id).to.equal(321);
      expect(entity.name).to.equal('The Customer');
    });
  });

  describe('.toDatabase', () => {
    it('returns customer object prepared to be persisted', () => {
      const customer = new Customer({
        name: 'The Customer',
        email: 'test@ipragmatech.com',
        password: '123456'
      });

      const dbCustomer = SequelizeCustomerMapper.toDatabase(customer);

      expect(dbCustomer.name).to.equal('The Customer');
      expect(dbCustomer).to.have.all.keys('name', 'email', 'password');
    });
  });
});
