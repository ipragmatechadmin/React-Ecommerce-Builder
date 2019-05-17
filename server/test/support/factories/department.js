const dataFaker = require('src/infra/support/dataFaker');

module.exports = (factory, { Department }) => {
  factory.define('department', Department, {
    name: dataFaker.name(),
    description: dataFaker.string()
  });
};
