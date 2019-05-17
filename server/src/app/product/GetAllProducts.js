const Operation = require('src/app/Operation');

class GetAllProducts extends Operation {
  constructor({ productsRepository }) {
    super();
    this.productsRepository = productsRepository;
  }

  async execute(page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const products = await this.productsRepository.getAll({
        attributes: ['product_id', 'name', 'description', 'price', 'discounted_price', 'image', 'image_2', 'thumbnail', 'display'],
        limit: limit,
        offset: (page-1)*limit
      });
      this.emit(SUCCESS, products);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllProducts.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllProducts;
