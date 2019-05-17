const Operation = require('src/app/Operation');

class Login extends Operation {
  constructor({ customersRepository }) {
    super();
    this.customersRepository = customersRepository;
  }

  async execute(customerData) {
    const { SUCCESS, NOT_FOUND } = this.outputs;
    try {
      this.emit(SUCCESS, this.customersRepository.serializeCustomer(customerData));
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

Login.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = Login;
