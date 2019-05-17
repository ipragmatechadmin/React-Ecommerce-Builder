const Operation = require("src/app/Operation");

class GetAllDepartments extends Operation {
  constructor({ departmentsRepository }) {
    super();
    this.departmentsRepository = departmentsRepository;
  }

  async execute(page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const departments = await this.departmentsRepository.getAll({
        attributes: ["department_id", "name", "description"],
        limit: limit,
        offset: (page - 1) * limit
      });
      this.emit(SUCCESS, departments);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllDepartments.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllDepartments;
