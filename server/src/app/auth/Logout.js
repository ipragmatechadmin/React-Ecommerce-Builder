const Operation = require('src/app/Operation');

class Logout extends Operation {
  constructor({ customersRepository }) {
    super();
    this.customersRepository = customersRepository;
  }

  async execute(req) {
    const { SUCCESS, NOT_FOUND } = this.outputs;
    try {
      req.logOut();
      this.emit(SUCCESS, {msg: "User logout successfully", status:true});
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

Logout.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = Logout;
