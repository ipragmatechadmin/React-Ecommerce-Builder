const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/department', () => {
  context('when there are departments', () => {
    beforeEach(() => {
      return factory.createMany('department', 2, [
        { name: 'First' },
        { name: 'Second' }
      ]);
    });

    it('return success with array of departments', async () => {
      const { body } = await request()
        .get('/api/department')
        .expect(200);

      expect(body.departments[0].name).to.equal('First');
      expect(body.departments[0]).to.have.all.keys('departmentId', 'name', 'description');

      expect(body.departments[1].name).to.equal('Second');
      expect(body.departments[1]).to.have.all.keys('departmentId', 'name', 'description');

      expect(body.pageCount).to.equal(1);
      expect(body.itemCount).to.equal(2);
    });
  });

  context('when there are no departments', () => {
    it('return success with empty array', async () => {
      const { body } = await request()
        .get('/api/department')
        .expect(200);

      expect(body.departments).to.have.lengthOf(0);
    });
  });

});
