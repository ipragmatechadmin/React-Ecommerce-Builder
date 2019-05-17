
const Operation = require('src/app/Operation');

class GetAllCategoriesByDepartment extends Operation {
  constructor({ categoriesRepository }) {
    super();
    this.categoriesRepository = categoriesRepository;
  }

  async execute(department, page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const categories = await this.categoriesRepository.getAll({
        attributes: ['category_id', 'name', 'description', 'department_id'],
        limit: limit,
        offset: (page-1)*limit,
        department: department
      });
      this.emit(SUCCESS, categories);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllCategoriesByDepartment.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllCategoriesByDepartment;
