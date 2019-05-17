const ShippingRegionMapper = require("./SequelizeShippingRegionMapper");

class SequelizeShippingRegionsRepository {
  constructor({ ShippingRegionModel }) {
    this.ShippingRegionModel = ShippingRegionModel;
  }

  async getAll(...args) {
    const shippingRegions = await this.ShippingRegionModel.findAndCountAll(
      ...args
    );
    shippingRegions.rows = shippingRegions.rows.map(
      ShippingRegionMapper.toEntity
    );
    return shippingRegions;
  }
}

module.exports = SequelizeShippingRegionsRepository;
