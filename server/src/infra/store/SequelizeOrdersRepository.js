const OrderMapper = require("./SequelizeOrderMapper");

class SequelizeOrdersRepository {
  constructor({ OrdersModel, EmailHandler }) {
    this.OrdersModel = OrdersModel;
    this.EmailHandler = EmailHandler;
  }

  async placeOrder(user, orderData) {
    const order = await this.OrdersModel.placeOrder(user, orderData);
    orderData.customerId = user.customer_id
    orderData.orderId = order[0].orderId;
    this.EmailHandler.sendEmail(user, orderData.orderId);
    return orderData;
  }

  async updateOrder(user, orderData) {
    const order = await this.OrdersModel.updateOrder(user, orderData);
    orderData.customerId = user.customer_id
    return orderData;
  }
}

module.exports = SequelizeOrdersRepository;
