const ShippingRegionSerializer = {
  serialize({ shipping_region_id, shipping_region }) {
    let shippingRegionId = shipping_region_id;
    let shippingRegion = shipping_region;
    return {
      shippingRegionId,
      shippingRegion
    };
  }
};

module.exports = ShippingRegionSerializer;
