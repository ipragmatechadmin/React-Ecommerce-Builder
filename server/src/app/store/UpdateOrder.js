const Operation = require('src/app/Operation');

class UpdateOrder extends Operation {
  constructor({ ordersRepository }) {
    super();
    this.ordersRepository = ordersRepository;
  }

  async execute(user, orderData, orderId) {
    orderData.orderId = orderId;
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;
    try {
      const order = await this.ordersRepository.updateOrder(user, orderData);
      this.emit(SUCCESS, order);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}

UpdateOrder.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = UpdateOrder;
