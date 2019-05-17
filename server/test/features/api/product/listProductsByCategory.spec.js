const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/product/findByCategory', () => {
  context('when there are products', () => {
    beforeEach(() => {
      let products =  factory.createMany('product', 2, [
        { name: 'Iris1', description: 'Iris was the Goddess of the Rainbow, daughter of the Titans Thaumas and Electra. Are you up to this T-shirt?!'},
      ]).then(products => {
        let productId = products[0]['dataValues']['product_id'];
        factory.createMany('category', 2, [
          { name: 'First', department_id: 1 },
          { name: 'Second', department_id: 1 }
        ]).then(categories => {
            factory.createMany('productCategory', 2, [{product_id: productId, category_id: categories[0]['dataValues']['category_id']}]);
        }).then(productCategory => {
          return products;
        })
      });
    });

    it('return success with array of products', async () => {
      const { body } = await request()
        .get('/api/product/findByCategory')
        .query({category: 1})
        .expect(200);
    });
  });

  context('when there are no products', () => {
    it('return success with empty array', async () => {
      const { body } = await request()
        .get('/api/product/findByCategory')
        .expect(200);

      expect(body.products).to.have.lengthOf(0);
    });
  });

});
