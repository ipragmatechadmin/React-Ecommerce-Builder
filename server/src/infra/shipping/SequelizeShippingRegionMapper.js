const ShippingRegion = require("src/domain/shipping/ShippingRegion");

const SequelizeShippingRegionMapper = {
  toEntity({ dataValues }) {
    const { shipping_region_id, shipping_region } = dataValues;
    return new ShippingRegion({ shipping_region_id, shipping_region });
  },

  toDatabase(survivor) {
    const { name } = survivor;

    return { name };
  }
};

module.exports = SequelizeShippingRegionMapper;
