const { attributes } = require('structure');

const ShippingRegion = attributes({
  shipping_region_id: Number,
  shipping_region: {
    type: String,
    required: true
  }
})(class ShippingRegion {
});

module.exports = ShippingRegion;
