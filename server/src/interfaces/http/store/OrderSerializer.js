const CartSerializer = {
  serialize({
    order_id,
    total_amount,
    created_on,
    shipped_on,
    status,
    comments,
    auth_code,
    reference,
    shipping_id,
    tax_id
  }) {
    let orderId = order_id;
    let totalAmount = total_amount;
    let createdOn = created_on;
    let shippedOn = shipped_on;
    let authCode = auth_code;
    let shippingId = shipping_id;
    let taxId = tax_id;
    return {
      orderId,
      totalAmount,
      createdOn,
      shippedOn,
      status,
      comments,
      authCode,
      reference,
      shippingId,
      taxId
    };
  }
};

module.exports = CartSerializer;
