const Operation = require('src/app/Operation');

class UpdateCartItem extends Operation {
  constructor({ cartsRepository }) {
    super();
    this.cartsRepository = cartsRepository;
  }

  async execute(user, cartData, itemId) {
    cartData.itemId = itemId;
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;
    try {
      const cart = await this.cartsRepository.updateCartItem(user, cartData);
      this.emit(SUCCESS, cart);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}

UpdateCartItem.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = UpdateCartItem;
