const Operation = require('src/app/Operation');

class GetShippingRegions extends Operation {
  constructor({ shippingRegionsRepository }) {
    super();
    this.shippingRegionsRepository = shippingRegionsRepository;
  }

  async execute(page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const shippingRegions = await this.shippingRegionsRepository.getAll({
        attributes: ['shipping_region_id', 'shipping_region'],
        limit: limit,
        offset: (page-1)*limit
      });
      this.emit(SUCCESS, shippingRegions);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetShippingRegions.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetShippingRegions;
