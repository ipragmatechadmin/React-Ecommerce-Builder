const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/product/findBySearchText', () => {
  context('when there are products', () => {
    beforeEach(() => {
      return factory.createMany('product', 2, [
        { name: 'Iris1', description: 'Iris was the Goddess of the Rainbow, daughter of the Titans Thaumas and Electra. Are you up to this T-shirt?!'},
        { name: 'Iris2', description: 'Iris was the Goddess of the Rainbow, daughter of the Titans Thaumas and Electra. Are you up to this T-shirt?!' }
      ]);
    });

    it('return success with array of products', async () => {
      const { body } = await request()
        .get('/api/product/findBySearchText')
        .query({searchText: 'Iris1'})
        .expect(200);

      expect(body.products[0].name).to.equal('Iris1');
      expect(body.products[0]).to.have.all.keys('productId', 'name', 'description', 'price', 'discountedPrice', 'thumbnail');
      expect(body.pageCount).to.equal(1);
      expect(body.itemCount).to.equal(1);

    });
  });

  context('when there are no products', () => {
    it('return success with empty array', async () => {
      const { body } = await request()
        .get('/api/product/findBySearchText')
        .expect(200);

      expect(body.products).to.have.lengthOf(0);
    });
  });

});
