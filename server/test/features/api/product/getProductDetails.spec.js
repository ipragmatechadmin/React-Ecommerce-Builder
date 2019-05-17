const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/product/:productId', () => {
  context('when there are products', () => {
    beforeEach(() => {
      return factory.createMany('product', 2, [
        { name: 'First' },
        { name: 'Second' }
      ]);
    });

    it('return success with product details', async () => {
      const { body } = await request()
        .get('/api/product/1')
        .expect(200);
      expect(body).to.have.all.keys('productId', 'name', 'description', 'price', 'discountedPrice', 'image', 'image2', 'thumbnail', 'display');

    });
  });

  context('when there are no product', () => {
    it('return success with product not found', async () => {
      const { body } = await request()
        .get('/api/product/300')
        .expect(404);
    });
  });

});
