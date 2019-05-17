const CartMapper = require("./SequelizeCartMapper");

class SequelizeCartsRepository {
  constructor({ ShoppingCartModel }) {
    this.ShoppingCartModel = ShoppingCartModel;
  }

  async addToCart(user, cartData) {
    const cart = await this.ShoppingCartModel.addToCart(user, cartData);
    return cartData;
  }

  async getCartItems(user, cartData) {
    const cart = await this.ShoppingCartModel.getCartItems(user, cartData);
    return cart;
  }

  async updateCartItem(user, cartData) {
    const cart = await this.ShoppingCartModel.updateCartItem(user, cartData);
    return cartData;
  }
}

module.exports = SequelizeCartsRepository;
