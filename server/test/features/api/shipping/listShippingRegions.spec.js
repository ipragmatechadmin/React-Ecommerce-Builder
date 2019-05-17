const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/shipping/findShippingRegion', () => {
  context('when there are shippingRegions', () => {
    beforeEach(() => {
      return factory.createMany('shippingRegion', 1, [
        { shipping_region: 'First' }
      ]);
    });

    it('return success with array of shippingRegions', async () => {
      const { body } = await request()
        .get('/api/shipping/findShippingRegion')
        .expect(200);

      expect(body.shippingRegions[0].shippingRegion).to.equal('First');
      expect(body.shippingRegions[0]).to.have.all.keys('shippingRegionId', 'shippingRegion');

      expect(body.pageCount).to.equal(1);
      expect(body.itemCount).to.equal(1);

    });
  });

  context('when there are no shippingRegions', () => {
    it('return success with empty array', async () => {
      const { body } = await request()
        .get('/api/shipping/findShippingRegion')
        .expect(200);

      expect(body.shippingRegions).to.have.lengthOf(0);
    });
  });

});
