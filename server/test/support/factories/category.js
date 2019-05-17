const dataFaker = require('src/infra/support/dataFaker');

module.exports = (factory, { Category }) => {
  factory.define('category', Category, {
    name: dataFaker.name(),
    description: dataFaker.string()
  });
};
