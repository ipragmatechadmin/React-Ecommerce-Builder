const { expect } = require('chai');
const factory = require('test/support/factory');
const SequelizeCustomersRepository = require('src/infra/customer/SequelizeCustomersRepository');
const Customer = require('src/domain/customer/Customer');
const { Customer: CustomerModel } = require('src/infra/database/models');

describe('Infra :: Customer :: SequelizeCustomersRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new SequelizeCustomersRepository({ CustomerModel });
  });

  describe('#getAll', () => {
    beforeEach(() => {
      return factory.createMany('customer', 2, [
        { name: 'Customer 1', email: 'test1@ipragmatech.com', password: '123456' },
        { name: 'Customer 2', email: 'test2@ipragmatech.com', password: '123456'  }
      ]);
    });

    it('returns all customers from the database', async () => {
      const customers = await repository.getAll();

      expect(customers).to.have.lengthOf(2);

      expect(customers[0]).to.be.instanceOf(Customer);
      expect(customers[0].name).to.equal('Customer 1');

      expect(customers[1]).to.be.instanceOf(Customer);
      expect(customers[1].name).to.equal('Customer 2');
    });
  });

  describe('#getById', () => {
    context('when customer exists', () => {
      it('returns the customer', async () => {
        const customer = await factory.create('customer', {
          name: 'Customer',
          email: 'test1@ipragmatech.com',
          password: '123456'
        });
        const foundCustomer = await repository.getById(customer.customer_id);
        expect(foundCustomer).to.be.instanceOf(Customer);
        expect(foundCustomer.name).to.equal('Customer');
        expect(foundCustomer.customer_id).to.equal(customer.customer_id);
      });
    });

    context('when the customer does not exist', () => {
      it('rejects with an error', async () => {
        try {
          await repository.getById(0);
        } catch(error) {
          expect(error.message).to.equal('NotFoundError');
          expect(error.details).to.equal('Customer with id 0 can\'t be found.');
        }
      });
    });
  });

  describe('#add', () => {
    context('when customer is valid', () => {
      it('persists the customer', () => {
        const customer = new Customer({
          name: 'The Customer',
          email: 'test1@ipragmatech.com',
          password: '123456'
        });

        expect(customer.validate().valid).to.be.ok();

        return expect(async () => {
          const persistedCustomer = await repository.add(customer);

          expect(persistedCustomer.customer_id).to.exist;
          expect(persistedCustomer.name).to.equal('The Customer');
        }).to.alter(() => repository.count(), { by: 1 });
      });
    });

    context('when customer is invalid', () => {
      it('does not persist the customer and rejects with an error', () => {
        const customer = new Customer();

        expect(customer.validate().valid).to.not.be.ok();

        return expect(async () => {
          try {
            await repository.add(customer);
          } catch(error) {
            expect(error.message).to.equal('ValidationError');
            expect(error.details).to.eql([
              { message: '"name" is required', path: 'name' },
              { message: '"email" is required', path: 'email' },
              { message: '"password" is required', path: 'password' }
            ]);
          }
        }).to.not.alter(() => repository.count());
      });
    });
  });

  describe('#remove', () => {
    context('when the customer exists', () => {
      it('removes the customer', async () => {
        const customer = await factory.create('customer', {
          name: 'Customer',
          email: 'test@ipragmatech.com',
          password: '123456'
        });

        return expect(async () => {
          return await repository.remove(customer.customer_id);
        }).to.alter(() => repository.count(), { by: -1 });
      });
    });

    context('when the customer does not exist', () => {
      it('returns an error', async () => {
        try {
          await repository.remove(0);
        } catch(error) {
          expect(error.message).to.equal('NotFoundError');
          expect(error.details).to.equal('Customer with id 0 can\'t be found.');
        }
      });
    });
  });

  describe('#update', () => {
    context('when the customer exists', () => {
      context('when data is valid', () => {
        it('updates and returns the updated customer', async () => {
          const customer = await factory.create('customer', {
            name: 'Customer',
            email: 'test@ipragmatech.com',
            password: '123456'
          });

          return expect(async () => {
            return await repository.update(customer.customer_id, { name: 'New Customer', email: customer.email, password: customer.password });
          }).to.alter(async () => {
            const dbCustomer = await CustomerModel.findById(customer.customer_id);

            return dbCustomer.name;
          }, { from: 'Customer', to: 'New Customer' });
        });
      });

      context('when data is not valid', () => {
        it('does not update and returns the error', async () => {
          const customer = await factory.create('customer', {
            name: 'Customer',
            email: 'test@ipragmatech.com',
            password: '123456'
          });

          return expect(async () => {
            try {
              await repository.update(customer.customer_id, { name: '', email: '', password: ''});
            } catch(error) {
              expect(error.message).to.equal('ValidationError');
            }
          }).to.not.alter(async () => {
            const dbCustomer = await CustomerModel.findById(customer.customer_id);
            return dbCustomer.name;
          }, { from: 'Customer', to: 'New Customer' });
        });
      });
    });

    context('when the customer does not exist', () => {
      it('returns an error', async () => {
        try {
          await repository.update(0, { name: 'New Customer' });
        } catch(error) {
          expect(error.message).to.equal('NotFoundError');
          expect(error.details).to.equal('Customer with id 0 can\'t be found.');
        }
      });
    });
  });
});
