const ShoppingCart = require("src/domain/store/ShoppingCart");

const SequelizeCartMapper = {
  toEntity({ dataValues }) {
    const {
      item_id,
      cart_id,
      product_id,
      attributes,
      quantity,
      buy_now,
      added_on
    } = dataValues;
    return new ShoppingCart({
      item_id,
      cart_id,
      product_id,
      attributes,
      quantity,
      buy_now,
      added_on
    });
  },

  toDatabase(survivor) {
    const { name } = survivor;

    return { name };
  }
};

module.exports = SequelizeCartMapper;
