const Orders = require("src/domain/store/Orders");

const SequelizeOrderMapper = {
  toEntity({ dataValues }) {
    const {
      order_id,
      total_amount,
      created_on,
      shipped_on,
      status,
      comments,
      auth_code,
      reference,
      shipping_id,
      tax_id
    } = dataValues;
    return new Orders({
      order_id,
      total_amount,
      created_on,
      shipped_on,
      status,
      comments,
      auth_code,
      reference,
      shipping_id,
      tax_id
    });
  },

  toDatabase(survivor) {
    const { name } = survivor;

    return { name };
  }
};

module.exports = SequelizeOrderMapper;
