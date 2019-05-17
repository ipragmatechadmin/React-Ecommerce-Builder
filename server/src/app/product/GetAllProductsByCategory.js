const Operation = require("src/app/Operation");

class GetAllProductsByCategory extends Operation {
  constructor({ productsRepository }) {
    super();
    this.productsRepository = productsRepository;
  }

  async execute(category = 1, page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const products = await this.productsRepository.getAllByCategy({
        page: page,
        limit: limit,
        offset: (page - 1) * limit,
        category: category
      });
      this.emit(SUCCESS, products);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllProductsByCategory.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllProductsByCategory;
