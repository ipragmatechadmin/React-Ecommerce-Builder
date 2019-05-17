const { attributes } = require('structure');

const Department = attributes({
  department_id: Number,
  name: {
    type: String,
    required: true
  },
  description: String
})(class Department {
});

module.exports = Department;
