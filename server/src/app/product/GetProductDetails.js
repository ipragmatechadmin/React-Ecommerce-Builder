const Operation = require("src/app/Operation");

class GetProductDetails extends Operation {
  constructor({ productsRepository }) {
    super();
    this.productsRepository = productsRepository;
  }

  async execute(productId) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      const product = await this.productsRepository.getDetails(productId);
      this.emit(SUCCESS, product);
    } catch (error) {
      if(error.message =='NotFoundError'){
        this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }
}

GetProductDetails.setOutputs(["SUCCESS", "ERROR", "NOT_FOUND"]);

module.exports = GetProductDetails;
