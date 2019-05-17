const Category = require("src/domain/category/Category");

const SequelizeCategoryMapper = {
  toEntity({ dataValues }) {
    const { category_id, name, description, department_id } = dataValues;
    return new Category({ category_id, name, description, department_id });
  },

  toDatabase(survivor) {
    const { name, description, department_id } = survivor;

    return { name, description, department_id };
  }
};

module.exports = SequelizeCategoryMapper;
