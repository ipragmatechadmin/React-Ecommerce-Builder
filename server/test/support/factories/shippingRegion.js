const dataFaker = require('src/infra/support/dataFaker');

module.exports = (factory, { ShippingRegion }) => {
  factory.define('shippingRegion', ShippingRegion, {
    shipping_region: dataFaker.name()
  });
};
