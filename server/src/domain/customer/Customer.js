const { attributes } = require('structure');
var validator = require("email-validator");

const Customer = attributes({
  customer_id: Number,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
})(class Customer {
  isEmailValid() {
    return validator.validate(this.email)
  }
});

module.exports = Customer;
