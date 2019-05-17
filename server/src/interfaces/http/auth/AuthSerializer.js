const AuthSerializer = {
  serialize({ customer_id, name, email }) {
    let customerId = customer_id;
    return {
      customerId,
      name,
      email
    };
  }
};

module.exports = AuthSerializer;
