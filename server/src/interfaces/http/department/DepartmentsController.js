const { Router } = require('express');
const paginate = require('express-paginate');
const { inject } = require('awilix-express');
const Status = require('http-status');

const DepartmentsController = {
  get router() {
    const router = Router();

    router.use(inject('departmentSerializer'));

    router.get('/', inject('getAllDepartments'), this.index);

    return router;
  },

  index(req, res, next) {
    const { getAllDepartments, departmentSerializer } = req;
    const { SUCCESS, ERROR } = getAllDepartments.outputs;
    getAllDepartments
      .on(SUCCESS, (departments) => {
        const itemCount = departments.count;
        const pageCount = Math.ceil(itemCount/req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = {
          departments: departments.rows.map(departmentSerializer.serialize),
          pageCount,
          itemCount,
          limit,
          currentPage
        }
        res
          .status(Status.OK)
          .json(results);
      })
      .on(ERROR, next);

    getAllDepartments.execute(req.query.page, req.query.limit);
  },

};

module.exports = DepartmentsController;
