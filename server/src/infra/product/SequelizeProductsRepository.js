const ProductMapper = require("./SequelizeProductMapper");

class SequelizeProductsRepository {
  constructor({ ProductModel }) {
    this.ProductModel = ProductModel;
  }

  async getAll(...args) {
    const products = await this.ProductModel.findAndCountAll(...args);
    products.rows = products.rows.map(ProductMapper.toEntity);
    return products;
  }

  async getAllByText(...args) {
    let offset = (args[0].page - 1) * args[0].limit;
    const products = await this.ProductModel.getAllProductsByText(
      args[0].searchText,
      args[0].page,
      args[0].limit,
      offset
    );
    let rows = JSON.parse(JSON.stringify(products));
    products.rows = rows;
    const productCount = await this.ProductModel.getAllProductsCountByText(
      args[0].searchText
    );
    products.count = (JSON.parse(JSON.stringify(productCount))[0]['count(*)']);
    return products;
  }

  async getAllByCategy(...args) {
    let offset = (args[0].page - 1) * args[0].limit;
    const products = await this.ProductModel.getAllProductsByCategory(
      args[0].category,
      args[0].page,
      args[0].limit,
      offset
    );
    let rows = JSON.parse(JSON.stringify(products));
    products.rows = rows;
    const productCount = await this.ProductModel.getAllProductsCountByCategory(
      args[0].category
    );
    products.count = (JSON.parse(JSON.stringify(productCount))[0]['categories_count']);
    return products;
  }

  async getAttributes(productId) {
    const productAttributes = await this.ProductModel.getAttributes(productId);
    if(productAttributes.length == 0){
      const notFoundError = new Error("NotFoundError");
      notFoundError.details = `ProductAttributes with id ${productId} can't be found.`;
      throw notFoundError;
    };
    return JSON.parse(JSON.stringify(productAttributes));
  }

  async getDetails(id) {
    const product = await this._getById(id);

    return ProductMapper.toEntity(product);
  }

  async add(product) {
    const { valid, errors } = product.validate();

    if (!valid) {
      const error = new Error("ValidationError");
      error.details = errors;

      throw error;
    }

    const newProduct = await this.ProductModel.create(
      ProductMapper.toDatabase(product)
    );
    return ProductMapper.toEntity(newProduct);
  }

  async remove(id) {
    const product = await this._getById(id);

    await product.destroy();
    return;
  }

  async update(id, newData) {
    const product = await this._getById(id);

    const transaction = await this.ProductModel.sequelize.transaction();

    try {
      const updatedProduct = await product.update(newData, { transaction });
      const productEntity = ProductMapper.toEntity(updatedProduct);

      const { valid, errors } = productEntity.validate();

      if (!valid) {
        const error = new Error("ValidationError");
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return productEntity;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.ProductModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.ProductModel.findById(id, { rejectOnEmpty: true });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error("NotFoundError");
        notFoundError.details = `Product with id ${id} can't be found.`;
        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizeProductsRepository;
