const Operation = require("src/app/Operation");

class AddToCart extends Operation {
  constructor({ cartsRepository }) {
    super();
    this.cartsRepository = cartsRepository;
  }

  async execute(user, cartData) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;
    try {
      const cart = await this.cartsRepository.addToCart(user, cartData);
      let cartItems = await this.cartsRepository.getCartItems(user, cartData);
      if (cartItems && cartItems.length > 0) {
        cartItems.forEach(function(item,cartsRepository) {
          if (item.product_id == cartData.productId) {
            cartData.itemId = item.item_id;
          }
        });
      }
      //Check if the quantity > 1
      if (cartData["quantity"] > 1) {
        let updatedCart = await this.cartsRepository.updateCartItem(user,cartData);
      }

      this.emit(SUCCESS, cartData);
    } catch (error) {
      console.log(error);
      if (error.message === "UnauthorizedError") {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}

AddToCart.setOutputs(["SUCCESS", "ERROR", "UNAUTHORIZED"]);

module.exports = AddToCart;
