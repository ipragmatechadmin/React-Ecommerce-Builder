const ShippingRate = require("src/domain/shipping/ShippingRate");

const SequelizeShippingRateMapper = {
  toEntity({ dataValues }) {
    const { shipping_region_id, shipping_id, shipping_type, shipping_cost } = dataValues;
    return new ShippingRate({ shipping_region_id, shipping_id, shipping_type, shipping_cost });
  },

  toDatabase(survivor) {
    const { name } = survivor;

    return { name };
  }
};

module.exports = SequelizeShippingRateMapper;
