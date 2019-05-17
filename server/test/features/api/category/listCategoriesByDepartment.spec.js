const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/category', () => {
  context('when there are categories', () => {
    beforeEach(() => {
      return factory.createMany('category', 2, [
        { name: 'First', department_id: 1 },
        { name: 'Second', department_id: 1 }
      ]);
    });

    it('return success with array of categories', async () => {
      const { body } = await request()
        .get('/api/category')
        .query({department: 1})
        .expect(200);

      expect(body.categories[0].name).to.equal('First');
      expect(body.categories[0]).to.have.all.keys('categoryId', 'name', 'description');

      expect(body.categories[1].name).to.equal('Second');
      expect(body.categories[1]).to.have.all.keys('categoryId', 'name', 'description');

      expect(body.pageCount).to.equal(1);
      expect(body.itemCount).to.equal(2);
    });
  });

  context('when there are no categories', () => {
    it('return success with empty array', async () => {
      const { body } = await request()
        .get('/api/category')
        .expect(200);

      expect(body.categories).to.have.lengthOf(0);
    });
  });

});
