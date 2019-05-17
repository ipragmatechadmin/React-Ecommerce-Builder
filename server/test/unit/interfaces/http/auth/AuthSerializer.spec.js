const { expect } = require('chai');
const AuthSerializer = require('src/interfaces/http/auth/AuthSerializer');
const Customer = require('src/domain/customer/Customer');

describe('Interfaces :: HTTP :: Auth :: AuthSerializer', () => {
  it('returns customer_id, email and name', () => {
    const serializedCustomer = AuthSerializer.serialize({
      customer_id: 123,
      email: 'test@ipragmatech.com',
      name: 'The Customer'
    });

    expect(serializedCustomer).to.eql({
      customerId: 123,
      name: 'The Customer',
      email: 'test@ipragmatech.com',
    });
  });

  it('ignores extra attributes', () => {
    const serializedCustomer = AuthSerializer.serialize({
      customer_id: 321,
      name: 'The Customer',
      email: 'test@ipragmatech.com',
      unknown: 'Hello!'
    });

    expect(serializedCustomer).to.eql({
      customerId: 321,
      name: 'The Customer',
      email: 'test@ipragmatech.com',
    });
  });

  it('is able to serialize customer entity instances', () => {
    const customer = new Customer({ customer_id: 1, name: 'Customer :)', email: 'test@ipragmatech.com' });
    const serializedCustomer = AuthSerializer.serialize(customer);

    expect(serializedCustomer).to.eql({
      customerId: 1,
      name: 'Customer :)',
      email: 'test@ipragmatech.com'
    });
  });
});
