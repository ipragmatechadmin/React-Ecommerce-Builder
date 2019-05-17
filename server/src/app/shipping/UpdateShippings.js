const Operation = require('src/app/Operation');

class UpdateShippings extends Operation {
  constructor({ shippingsRepository }) {
    super();
    this.shippingsRepository = shippingsRepository;
  }

  async execute(user, shippingData) {
    const { SUCCESS, ERROR, UNAUTHORIZED} = this.outputs;
    try {
      this.isAuthorized(user);
      const shippings = await this.shippingsRepository.update(user, shippingData);
      this.emit(SUCCESS, shippings);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}

UpdateShippings.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);
module.exports = UpdateShippings;
