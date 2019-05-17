const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const AuthController = {
  get router() {
    const router = Router();

    router.use(inject('authSerializer'));

    router.post('/', inject('login'), this.index);

    return router;
  },

  index(req, res, next) {
    const { login, authSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND  } = login.outputs;
    login
      .on(SUCCESS, (customer) => {
        res
          .status(Status.OK)
          .json(authSerializer.serialize(customer));
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    login.execute(req.user);
  }
};

module.exports = AuthController;
