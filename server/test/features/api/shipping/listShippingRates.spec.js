const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/shipping/findShippingRates/{regionId}', () => {
  context('when there are shippingRegions', () => {
    beforeEach(() => {
      return factory.createMany('shippingRate', 1, [
        { shipping_type: '7 Days ($5)', shipping_cost: 5.00, shipping_region_id: 1 }
      ]);
    });

    it('return success with array of shippingRates', async () => {
      const { body } = await request()
        .get('/api/shipping/findShippingRates/1')
        .expect(200);

      expect(body[0].shippingType).to.equal('7 Days ($5)');
      expect(body[0]).to.have.all.keys('shippingId','shippingType', 'shippingCost', 'shippingRegionId');

    });
  });

  context('when there are no shippingRates', () => {
    it('return success with empty array', async () => {
      const { body } = await request()
        .get('/api/shipping/findShippingRates/0')
        .expect(200);

      expect(body).to.have.lengthOf(0);
    });
  });

});
