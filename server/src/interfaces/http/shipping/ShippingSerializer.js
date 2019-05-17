const ShippingSerializer = {
  serialize({
    customer_id,
    address_1,
    address_2,
    city,
    region,
    postal_code,
    country,
    shipping_region_id
  }) {
    let customerId = customer_id;
    let address1 = address_1;
    let address2 = address_2;
    let postalCode = postal_code;
    let shippingRegionId =  shipping_region_id;
    return {
      customerId,
      address1,
      address2,
      city,
      region,
      postalCode,
      country,
      shippingRegionId
    };
  }
};

module.exports = ShippingSerializer;
