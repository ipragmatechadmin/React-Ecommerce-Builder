const ShippingRateMapper = require("./SequelizeShippingRateMapper");

class SequelizeShippingRatesRepository {
  constructor({ ShippingRateModel }) {
    this.ShippingRateModel = ShippingRateModel;
  }

  async findAll(...args) {
    const shippingRates = await this.ShippingRateModel.findAll({
      where: {
        shipping_region_id: args[0].regionId
      }
    });
    shippingRates.map(ShippingRateMapper.toEntity);
    return shippingRates;
  }
}

module.exports = SequelizeShippingRatesRepository;
