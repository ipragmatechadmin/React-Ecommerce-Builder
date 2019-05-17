const Product = require('src/domain/product/Product');

const SequelizeProductMapper = {
  toEntity({ dataValues }) {
    const { product_id, name, description, price, discounted_price, image, image_2, thumbnail, display} = dataValues;
    return new Product({ product_id, name, description, price, discounted_price, image, image_2, thumbnail, display});
  },

  toDatabase(survivor) {
    const { name } = survivor;

    return { name };
  }
};

module.exports = SequelizeProductMapper;
