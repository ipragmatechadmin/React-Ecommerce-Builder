const dataFaker = require('src/infra/support/dataFaker');

module.exports = (factory, { AttributeValue }) => {
  factory.define('attribute_value', AttributeValue, {
    attribute_id: dataFaker.integer({ min: 0, max: 3 }),
    value: dataFaker.string(),
  });
};
