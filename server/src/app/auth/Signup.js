const Operation = require('src/app/Operation');
const Customer = require('src/domain/customer/Customer');
const util = require('util')

class Signup extends Operation {
  constructor({ customersRepository }) {
    super();
    this.customersRepository = customersRepository;
  }

  async execute(customerData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    const customer = new Customer(customerData);

    try {
      const newCustomer = await this.customersRepository.add(customer);
      this.emit(SUCCESS, newCustomer);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

Signup.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = Signup;
