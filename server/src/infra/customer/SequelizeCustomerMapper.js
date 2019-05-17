const Customer = require('src/domain/customer/Customer');

const SequelizeCustomerMapper = {
  toEntity({ dataValues }) {
    const { customer_id, name, email, password } = dataValues;
    return new Customer({ customer_id, name, email, password });
  },

  toDatabase(survivor) {
    const { name, email, password } = survivor;
    return { name, email, password };
  }
};

module.exports = SequelizeCustomerMapper;
