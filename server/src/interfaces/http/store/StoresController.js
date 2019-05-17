const { Router } = require("express");
const { inject } = require("awilix-express");
const Status = require("http-status");

const StoresController = {
  get router() {
    const router = Router();
    router.use(inject("cartSerializer"));
    router.use(inject("orderSerializer"));
    router.post("/cart", inject("addToCart"), this.addToCart);
    router.get("/cart", inject("getCart"), this.getCart);
    router.post("/order", inject("placeOrder"), this.placeOrder);
    router.put("/order/:orderId", inject("updateOrder"), this.updateOrder);
    router.put("/cart/:itemId", inject("updateCartItem"), this.updateCartItem);
    return router;
  },

  addToCart(req, res, next) {
    const { addToCart, cartSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = addToCart.outputs;
    addToCart
      .on(SUCCESS, cart => {
        const results = cart;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
    addToCart.execute(req.user, req.body);
  },
  getCart(req, res, next) {
    const { getCart, cartSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = getCart.outputs;
    getCart
      .on(SUCCESS, cart => {
        const results = cart;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
    getCart.execute(req.user);
  },
  placeOrder(req, res, next) {
    const { placeOrder, orderSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = placeOrder.outputs;
    placeOrder
      .on(SUCCESS, order => {
        const results = order;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
    placeOrder.execute(req.user, req.body);
  },
  updateOrder(req, res, next) {
    const { updateOrder, orderSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = updateOrder.outputs;
    updateOrder
      .on(SUCCESS, order => {
        const results = order;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
    updateOrder.execute(req.user, req.body, req.params.orderId);
  },
  updateCartItem(req, res, next) {
    const { updateCartItem, orderSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = updateCartItem.outputs;
    updateCartItem
      .on(SUCCESS, cart => {
        const results = cart;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
    updateCartItem.execute(req.user, req.body, req.params.itemId);
  }
};

module.exports = StoresController;
