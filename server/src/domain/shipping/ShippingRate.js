const { attributes } = require('structure');

const ShippingRate = attributes({
  shipping_region_id: Number,
  shipping_type: {
    type: String,
    required: true
  },
  shipping_cost: Number,
  shipping_id: Number
})(class ShippingRate {
});

module.exports = ShippingRate;
