const { Router } = require("express");
const paginate = require("express-paginate");
const { inject } = require("awilix-express");
const Status = require("http-status");

const SignoutController = {
  get router() {
    const router = Router();
    router.post("/", inject("logout"), this.index);
    return router;
  },

  index(req, res, next) {
    const { logout} = req;
    const { SUCCESS, ERROR, NOT_FOUND  } = logout.outputs;
    logout
      .on(SUCCESS, (message) => {
        res
          .status(Status.OK)
          .json(message);
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);
    logout.execute(req);
  }
};

module.exports = SignoutController;
