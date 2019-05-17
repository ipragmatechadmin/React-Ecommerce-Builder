const dataFaker = require('src/infra/support/dataFaker');

module.exports = (factory, { ProductAttribute }) => {
  factory.define('product_attribute', ProductAttribute, {
    product_id: dataFaker.integer({ min: 0, max: 3 }),
    attribute_value_id: dataFaker.integer({ min: 0, max: 3 })
  });
};
