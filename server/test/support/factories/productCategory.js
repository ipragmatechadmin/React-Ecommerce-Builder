const dataFaker = require("src/infra/support/dataFaker");

module.exports = (factory, { ProductCategory }) => {
  factory.define("productCategory", ProductCategory, {
    product_id: dataFaker.integer({ min: 0, max: 3 }),
    category_id: dataFaker.integer({ min: 0, max: 3 })
  });
};
