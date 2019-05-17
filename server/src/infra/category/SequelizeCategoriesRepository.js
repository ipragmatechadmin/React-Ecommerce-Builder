const CategoryMapper = require("./SequelizeCategoryMapper");

class SequelizeCategoriesRepository {
  constructor({ CategoryModel }) {
    this.CategoryModel = CategoryModel;
  }

  async getAll(...args) {
    const categories = await this.CategoryModel.getAllCategoriesByDepartment(
      args[0].department,
      args[0].page,
      args[0].limit,
      args[0].offset
    );
    let rows = JSON.parse(JSON.stringify(categories));
    categories.rows = rows;
    categories.count = rows.length;
    return categories;
  }
}

module.exports = SequelizeCategoriesRepository;
