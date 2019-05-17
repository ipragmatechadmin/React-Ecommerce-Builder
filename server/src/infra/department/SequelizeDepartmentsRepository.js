const DepartmentMapper = require("./SequelizeDepartmentMapper");

class SequelizeDepartmentsRepository {
  constructor({ DepartmentModel }) {
    this.departmentModel = DepartmentModel;
  }

  async getAll(...args) {
    const departments = await this.departmentModel.findAndCountAll(...args);
    departments.rows = departments.rows.map(DepartmentMapper.toEntity);
    return departments;
  }
}

module.exports = SequelizeDepartmentsRepository;
