const { Router } = require("express");
const statusMonitor = require("express-status-monitor");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const methodOverride = require("method-override");
const controller = require("./utils/createControllerRoutes");
const passport = require("../../../config/passport");

module.exports = ({
  config,
  containerMiddleware,
  loggerMiddleware,
  errorHandler,
  swaggerMiddleware
}) => {
  const router = Router();

  /* istanbul ignore if */
  if (config.env === "development") {
    router.use(statusMonitor());
  }

  /* istanbul ignore if */
  if (config.env !== "test") {
    router.use(loggerMiddleware);
  }

  const apiRouter = Router();

  apiRouter
    .use(methodOverride("X-HTTP-Method-Override"))
    .use(
      cors({
        origin: ["http://localhost:3000", "http://localhost", "https://react-ipragmatech-ecommerce.herokuapp.com"],
        credentials: true
      })
    )
    .use(bodyParser.json())
    .use(compression())
    .use(containerMiddleware)
    .use("/docs", swaggerMiddleware);

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */

  apiRouter.use("/product", controller("product/ProductsController"));

  apiRouter.use("/department", controller("department/DepartmentsController"));

  apiRouter.use("/category", controller("category/CategoriesController"));

  apiRouter.use("/shipping", controller("shipping/ShippingsController"));

  apiRouter.use("/store", controller("store/StoresController"));

  apiRouter.use(
    "/login",
    passport.authenticate("local"),
    controller("auth/AuthController")
  );

  apiRouter.use("/signout", controller("auth/SignoutController"));
  apiRouter.use("/signup", controller("auth/SignupController"));
  apiRouter.use("/getUserInfo", controller("auth/UserInfoController"));

  router.use("/api", apiRouter);

  router.use(errorHandler);

  return router;
};
