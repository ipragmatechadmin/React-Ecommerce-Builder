const { attributes } = require('structure');

const Shipping = attributes({
  customer_id: Number,
  address_1: {
    type: String
  },
  address_2: {
    type: String
  },
  city: {
    type: String
  },
  region: {
    type: String
  },
  postal_code: {
    type: String
  },
  country: {
    type: String
  },
  shipping_region_id: {
    type: Number,
    required: true
  },
})(class Shipping {
});

module.exports = Shipping;
