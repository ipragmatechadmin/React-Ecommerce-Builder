const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const SignupController = {
  get router() {
    const router = Router();

    router.use(inject('authSerializer'));
    router.post('/', inject('signup'), this.index);
    return router;
  },

  index(req, res, next) {
    const { signup, authSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = signup.outputs;

    signup
      .on(SUCCESS, (customer) => {
        res
          .status(Status.CREATED)
          .json(authSerializer.serialize(customer));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);

    signup.execute(req.body);
  },

};

module.exports = SignupController;
