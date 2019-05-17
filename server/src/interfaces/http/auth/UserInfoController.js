const { Router } = require("express");
const { inject } = require("awilix-express");
const Status = require("http-status");

const UserInfoController = {
  get router() {
    const router = Router();

    router.use(inject("authSerializer"));

    router.get("/", inject("userInfo"), this.index);

    return router;
  },

  index(req, res, next) {
    const { userInfo, authSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = userInfo.outputs;
    userInfo
      .on(SUCCESS, customer => {
        res.status(Status.OK).json(authSerializer.serialize(customer));
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          details: error.details
        });
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
    userInfo.execute(req.user);
  }
};

module.exports = UserInfoController;
