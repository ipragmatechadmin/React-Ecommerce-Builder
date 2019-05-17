const dataFaker = require('src/infra/support/dataFaker');

module.exports = (factory, { Attribute }) => {
  factory.define('attribute', Attribute, {
    name: dataFaker.name()
  });
};
