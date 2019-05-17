const { Router } = require("express");
const paginate = require("express-paginate");
const { inject } = require("awilix-express");
const Status = require("http-status");

const ProductsController = {
  get router() {
    const router = Router();

    router.use(inject("productSerializer"));
    router.use(inject("productAttributeSerializer"));

    router.get("/", inject("getAllProducts"), this.index);

    router.get(
      "/getAttributes/:productId",
      inject("getProductAttributes"),
      this.getProductAttributes
    );
    router.get(
      "/findBySearchText",
      inject("getAllProductsByText"),
      this.getAllProductsByText
    );
    router.get(
      "/findByCategory",
      inject("getAllProductsByCategory"),
      this.getAllProductsByCategory
    );
    router.get(
      "/:productId",
      inject("getProductDetails"),
      this.getProductDetails
    );

    return router;
  },

  index(req, res, next) {
    const { getAllProducts, productSerializer } = req;
    const { SUCCESS, ERROR } = getAllProducts.outputs;
    getAllProducts
      .on(SUCCESS, products => {
        const itemCount = products.count;
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = {
          products: products.rows.map(productSerializer.serialize),
          pageCount,
          itemCount,
          limit,
          currentPage
        };
        res.status(Status.OK).json(results);
      })
      .on(ERROR, next);

    getAllProducts.execute(req.query.page, req.query.limit);
  },

  show(req, res, next) {
    const { getProduct, productSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getProduct.outputs;

    getProduct
      .on(SUCCESS, product => {
        res.status(Status.OK).json(productSerializer.serialize(product));
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          details: error.details
        });
      })
      .on(ERROR, next);

    getProduct.execute(Number(req.params.id));
  },

  create(req, res, next) {
    const { createProduct, productSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createProduct.outputs;

    createProduct
      .on(SUCCESS, product => {
        res.status(Status.CREATED).json(productSerializer.serialize(product));
      })
      .on(VALIDATION_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          type: "ValidationError",
          details: error.details
        });
      })
      .on(ERROR, next);

    createProduct.execute(req.body);
  },

  update(req, res, next) {
    const { updateProduct, productSerializer } = req;
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = updateProduct.outputs;

    updateProduct
      .on(SUCCESS, product => {
        res.status(Status.ACCEPTED).json(productSerializer.serialize(product));
      })
      .on(VALIDATION_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          type: "ValidationError",
          details: error.details
        });
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          details: error.details
        });
      })
      .on(ERROR, next);

    updateProduct.execute(Number(req.params.id), req.body);
  },

  delete(req, res, next) {
    const { deleteProduct } = req;
    const { SUCCESS, ERROR, NOT_FOUND } = deleteProduct.outputs;

    deleteProduct
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          details: error.details
        });
      })
      .on(ERROR, next);

    deleteProduct.execute(Number(req.params.id));
  },

  getAllProductsByText(req, res, next) {
    const { getAllProductsByText, productSerializer } = req;
    const { SUCCESS, ERROR } = getAllProductsByText.outputs;
    getAllProductsByText
      .on(SUCCESS, products => {
        const itemCount = products.count;
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = {
          products: products.rows.map(productSerializer.serialize),
          pageCount,
          itemCount,
          limit,
          currentPage
        };
        res.status(Status.OK).json(results);
      })
      .on(ERROR, next);
    getAllProductsByText.execute(
      req.query.searchText,
      req.query.page,
      req.query.limit
    );
  },

  getAllProductsByCategory(req, res, next) {
    const { getAllProductsByCategory, productSerializer } = req;
    const { SUCCESS, ERROR } = getAllProductsByCategory.outputs;
    getAllProductsByCategory
      .on(SUCCESS, products => {
        const itemCount = products.count;
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = {
          products: products.rows.map(productSerializer.serialize),
          pageCount,
          itemCount,
          limit,
          currentPage
        };
        res.status(Status.OK).json(results);
      })
      .on(ERROR, next);
    console.log("Finding Category:" + req.query.category);
    getAllProductsByCategory.execute(
      req.query.category,
      req.query.page,
      req.query.limit
    );
  },

  getProductDetails(req, res, next) {
    const { getProductDetails, productSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getProductDetails.outputs;

    getProductDetails
      .on(SUCCESS, product => {
        res.status(Status.OK).json(productSerializer.serialize(product));
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          details: error.details
        });
      })
      .on(ERROR, next);

    getProductDetails.execute(Number(req.params.productId));
  },

  getProductAttributes(req, res, next) {
    const { getProductAttributes, productAttributeSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getProductAttributes.outputs;

    getProductAttributes
      .on(SUCCESS, getProductAttributes => {
        res.status(Status.OK).json(getProductAttributes.map(productAttributeSerializer.serialize));
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          details: error.details
        });
      })
      .on(ERROR, next);

    getProductAttributes.execute(Number(req.params.productId));
  }
};

module.exports = ProductsController;
