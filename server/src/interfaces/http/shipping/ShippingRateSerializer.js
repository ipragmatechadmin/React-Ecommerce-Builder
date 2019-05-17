const ShippingRateSerializer = {
  serialize({ shipping_region_id, shipping_id, shipping_type, shipping_cost }) {
    let shippingRegionId = shipping_region_id;
    let shippingType = shipping_type;
    let shippingCost= shipping_cost;
    let shippingId = shipping_id
    return {
      shippingId,
      shippingRegionId,
      shippingType,
      shippingCost
    };
  }
};

module.exports = ShippingRateSerializer;
