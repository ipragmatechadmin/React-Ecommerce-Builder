const Operation = require("src/app/Operation");

class UserInfo extends Operation {
  constructor({ customersRepository }) {
    super();
    this.customersRepository = customersRepository;
  }

  async execute(customerData) {
    const { SUCCESS, NOT_FOUND, UNAUTHORIZED } = this.outputs;
    try {
      this.isAuthorized(customerData);
      this.emit(
        SUCCESS,
        this.customersRepository.serializeCustomer({dataValues: customerData})
      );
    } catch (error) {
      console.log(error);
      if (error.message === "UnauthorizedError") {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

UserInfo.setOutputs(["SUCCESS", "ERROR", "NOT_FOUND", "UNAUTHORIZED"]);

module.exports = UserInfo;
