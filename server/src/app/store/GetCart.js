const Operation = require('src/app/Operation');

class GetCart extends Operation {
  constructor({ cartsRepository }) {
    super();
    this.cartsRepository = cartsRepository;
  }

  async execute(user) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;
    try {
      const cart = await this.cartsRepository.getCart(user);
      this.emit(SUCCESS, cart);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}

GetCart.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = GetCart;
