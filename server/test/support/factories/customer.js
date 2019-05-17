const dataFaker = require('src/infra/support/dataFaker');

module.exports = (factory, { Customer }) => {
  factory.define('customer', Customer, {
    name: dataFaker.name(),
    email: dataFaker.email(),
    password: '123456',
  });
};
