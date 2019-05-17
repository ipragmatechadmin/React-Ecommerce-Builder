const Operation = require("src/app/Operation");

class GetAllProductsByText extends Operation {
  constructor({ productsRepository }) {
    super();
    this.productsRepository = productsRepository;
  }

  async execute(searchText = "", page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const products = await this.productsRepository.getAllByText({
        page: page,
        limit: limit,
        offset: (page - 1) * limit,
        searchText: searchText
      });
      this.emit(SUCCESS, products);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllProductsByText.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllProductsByText;
