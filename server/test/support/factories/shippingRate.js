const dataFaker = require('src/infra/support/dataFaker');

module.exports = (factory, { ShippingRate }) => { 
  factory.define('shippingRate', ShippingRate, {
    shipping_type: dataFaker.string(),
    shipping_cost: dataFaker.string(),
    shipping_region_id: dataFaker.integer({ min: 0, max: 3 })
  });
};
