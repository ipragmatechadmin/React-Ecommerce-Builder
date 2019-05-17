const { Router } = require("express");
const { inject } = require("awilix-express");
const Status = require("http-status");

const ShippingsController = {
  get router() {
    const router = Router();

    router.use(inject("shippingSerializer"));
    router.use(inject("shippingRateSerializer"));
    router.use(inject("shippingRegionSerializer"));

    router.get("/findShippingRegion", inject("getShippingRegions"), this.index);
    router.get(
      "/findShippingRates/:regionId",
      inject("getShippingRates"),
      this.shipingRates
    );
    router.post("/", inject("updateShippings"), this.updateShiping);
    router.get("/", inject("getShippings"), this.getShipping);
    return router;
  },

  index(req, res, next) {
    const { getShippingRegions, shippingRegionSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND } = getShippingRegions.outputs;
    getShippingRegions
      .on(SUCCESS, shippingRegions => {
        const itemCount = shippingRegions.count;
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = {
          shippingRegions: shippingRegions.rows.map(
            shippingRegionSerializer.serialize
          ),
          pageCount,
          itemCount,
          limit,
          currentPage
        };
        res.status(Status.OK).json(results);
      })
      .on(ERROR, next);
    getShippingRegions.execute(req.query.page, req.query.limit);
  },

  shipingRates(req, res, next) {
    const { getShippingRates, shippingRateSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND } = getShippingRates.outputs;
    getShippingRates
      .on(SUCCESS, shippingRates => {
        const itemCount = shippingRates.count;
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = shippingRates.map(shippingRateSerializer.serialize);
        res.status(Status.OK).json(results);
      })
      .on(ERROR, next);
    getShippingRates.execute(
      req.params.regionId,
      req.query.page,
      req.query.limit
    );
  },

  updateShiping(req, res, next) {
    const { updateShippings, shippingSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = updateShippings.outputs;
    updateShippings
      .on(SUCCESS, shippingAddress => {
        res.status(Status.OK).json(shippingAddress);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
    updateShippings.execute(req.user, req.body);
  },

  getShipping(req, res, next) {
    const { getShippings, shippingSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = getShippings.outputs;
    getShippings
      .on(SUCCESS, shippingAddress => {
        res
          .status(Status.OK)
          .json(shippingAddress.map(shippingSerializer.serialize));
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);

    getShippings.execute(req.user);
  }
};

module.exports = ShippingsController;
