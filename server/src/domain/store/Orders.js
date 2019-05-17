const { attributes } = require('structure');

const Orders = attributes({
  order_id: {
    type: Number
  },
  total_amount: {
    type: String
  },
  created_on: {
    type: String
  },
  shipped_on: {
    type: String
  },
  status: {
    type: Number
  },
  comments: {
    type: String
  },
  auth_code: {
    type: String
  },
  reference: {
    type: String
  },
  shipping_id: {
    type: Number
  },
  tax_id: {
    type: Number
  },
})(class Orders {
});

module.exports = Orders;
