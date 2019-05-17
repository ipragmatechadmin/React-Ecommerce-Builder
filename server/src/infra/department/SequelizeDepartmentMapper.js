const Department = require('src/domain/department/Department');

const SequelizeDepartmentMapper = {
  toEntity({ dataValues }) {
    const { department_id, name, description, price, discounted_price, image, image_2, thumbnail, display} = dataValues;
    return new Department({ department_id, name, description, price, discounted_price, image, image_2, thumbnail, display});
  },

  toDatabase(survivor) {
    const { name } = survivor;

    return { name };
  }
};

module.exports = SequelizeDepartmentMapper;
