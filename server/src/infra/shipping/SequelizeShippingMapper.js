const Shipping = require("src/domain/shipping/Shipping");

const SequelizeShippingMapper = {
  toEntity({ dataValues }) {
    const {
      customer_id,
      address_1,
      address_2,
      city,
      region,
      postal_code,
      country,
      shipping_region_id
    } = dataValues;
    return new Shipping({
      customer_id,
      address_1,
      address_2,
      city,
      region,
      postal_code,
      country,
      shipping_region_id
    });
  },

  toDatabase(survivor) {
    const { name } = survivor;

    return { name };
  }
};

module.exports = SequelizeShippingMapper;
