const { Router } = require("express");
const paginate = require("express-paginate");
const { inject } = require("awilix-express");
const Status = require("http-status");

const CategoriesController = {
  get router() {
    const router = Router();

    router.use(inject("categorySerializer"));

    router.get("/", inject("getAllCategoriesByDepartment"), this.index);

    return router;
  },

  index(req, res, next) {
    const { getAllCategoriesByDepartment, categorySerializer } = req;
    const { SUCCESS, ERROR } = getAllCategoriesByDepartment.outputs;
    getAllCategoriesByDepartment
      .on(SUCCESS, categories => {
        const itemCount = categories.count;
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = {
          categories: categories.rows.map(categorySerializer.serialize),
          pageCount,
          itemCount,
          limit,
          currentPage
        };
        res.status(Status.OK).json(results);
      })
      .on(ERROR, next);

    getAllCategoriesByDepartment.execute(
      parseInt(req.query.department) || 0,
      req.query.page,
      req.query.limit
    );
  }
};

module.exports = CategoriesController;
