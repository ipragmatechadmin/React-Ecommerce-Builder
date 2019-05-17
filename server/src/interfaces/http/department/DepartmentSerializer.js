const DepartmentSerializer = {
  serialize({ department_id, name, description }) {
    let departmentId = department_id;
    return {
      departmentId,
      name,
      description
    };
  }
};

module.exports = DepartmentSerializer;
