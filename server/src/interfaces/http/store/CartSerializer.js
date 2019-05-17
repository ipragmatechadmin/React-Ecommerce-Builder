const CartSerializer = {
  serialize({
    item_id,
    cart_id,
    product_id,
    attributes,
    quantity,
    buy_now,
    added_on
  }) {
    let itemId = item_id;
    let cartId = cart_id;
    let productId = product_id;
    let buyNow = buy_now;
    let createdDate =  added_on;
    return {
      itemId,
      cartId,
      productId,
      attributes,
      quantity,
      buyNow,
      createdDate
    };
  }
};

module.exports = CartSerializer;
