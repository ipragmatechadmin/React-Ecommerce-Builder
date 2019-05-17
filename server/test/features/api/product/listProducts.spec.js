const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/product', () => {
  context('when there are products', () => {
    beforeEach(() => {
      return factory.createMany('product', 2, [
        { name: 'First' },
        { name: 'Second' }
      ]);
    });

    it('return success with array of products', async () => {
      const { body } = await request()
        .get('/api/product')
        .expect(200);
      expect(body.products).to.have.lengthOf(2);
      expect(body.products[0]).to.have.all.keys('productId', 'name', 'description', 'price', 'discountedPrice', 'image', 'image2', 'thumbnail', 'display');
      expect(body.products[1]).to.have.all.keys('productId', 'name', 'description', 'price', 'discountedPrice', 'image', 'image2', 'thumbnail', 'display');
      expect(body.pageCount).to.equal(1);
      expect(body.itemCount).to.equal(2);

    });
  });

  context('when there are no products', () => {
    it('return success with empty array', async () => {
      const { body } = await request()
        .get('/api/product')
        .expect(200);

      expect(body.products).to.have.lengthOf(0);
    });
  });

});
