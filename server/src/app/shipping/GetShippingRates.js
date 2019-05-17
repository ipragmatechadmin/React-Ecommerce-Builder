const Operation = require('src/app/Operation');

class GetShippingRates extends Operation {
  constructor({ shippingRatesRepository }) {
    super();
    this.shippingRatesRepository = shippingRatesRepository;
  }

  async execute(regionId, page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const shippingRates = await this.shippingRatesRepository.findAll({
        attributes: ['shipping_region_id', 'shipping_type', 'shipping_cost', 'shipping_id'],
        limit: limit,
        offset: (page-1)*limit,
        regionId: regionId
      });
      this.emit(SUCCESS, shippingRates);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetShippingRates.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetShippingRates;
