const dataFaker = require('src/infra/support/dataFaker');

module.exports = (factory, { Product }) => {
  factory.define('product', Product, {
    name: dataFaker.name(),
    description: dataFaker.string(),
    price: dataFaker.floating({ min: 0, max: 100, fixed: 2 }),
    discounted_price: dataFaker.floating({ min: 0, max: 100, fixed: 2 }),
    image: dataFaker.avatar({protocol: 'https', fileExtension: 'jpg'}),
    image_2: dataFaker.avatar({protocol: 'https', fileExtension: 'jpg'}),
    thumbnail: dataFaker.avatar({protocol: 'https', fileExtension: 'jpg'}),
    display: dataFaker.integer({ min: 0, max: 3 })
  });
};
