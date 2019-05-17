const CustomerMapper = require('./SequelizeCustomerMapper');
const Customer = require('src/domain/customer/Customer');

class SequelizeCustomersRepository {
  constructor({ CustomerModel }) {
    this.CustomerModel = CustomerModel;
  }

  async getAll(...args) {
    const customers = await this.CustomerModel.findAll(...args);

    return customers.map(CustomerMapper.toEntity);
  }

  async getById(id) {
    const customer = await this._getById(id);

    return CustomerMapper.toEntity(customer);
  }

  async add(customer) {
    const { valid, errors } = customer.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      throw error;
    }
    const newCustomerId = await this.CustomerModel.addCustomer(CustomerMapper.toDatabase(customer));
    let customer_id = ((JSON.parse(JSON.stringify(newCustomerId))[0]['LAST_INSERT_ID()']));
    let name = customer.name;
    let email = customer.email;
    let password = customer.password;
    return CustomerMapper.toEntity({'dataValues':{ customer_id, name, email, password }});
  }

  serializeCustomer(customer) {
    return CustomerMapper.toEntity(customer);
  }

  async remove(id) {
    const customer = await this._getById(id);
    await customer.destroy();
    return;
  }

  async update(id, newData) {
    const customer = await this._getById(id);

    const transaction = await this.CustomerModel.sequelize.transaction();

    try {
      const updatedCustomer = await customer.update(newData, { transaction });

      const customerEntity = CustomerMapper.toEntity(updatedCustomer);

      const { valid, errors } = customerEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;
        throw error;
      }

      await transaction.commit();

      return customerEntity;
    } catch(error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.CustomerModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.CustomerModel.findById(id, { rejectOnEmpty: true });
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Customer with id ${id} can't be found.`;
        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizeCustomersRepository;
