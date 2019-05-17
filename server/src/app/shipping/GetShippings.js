const Operation = require('src/app/Operation');

class GetShippings extends Operation {
  constructor({ shippingsRepository }) {
    super();
    this.shippingsRepository = shippingsRepository;
  }

  async execute(user) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;
    try {
      this.isAuthorized(user);
      const shippings = await this.shippingsRepository.getShipping(user);
      this.emit(SUCCESS, shippings);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}

GetShippings.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = GetShippings;
