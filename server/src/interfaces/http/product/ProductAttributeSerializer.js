const ProductSerializer = {
  serialize({ attribute_value_id, attribute_value, attribute_name }) {
    let attributeValueId = attribute_value_id;
    let attributeValue = attribute_value;
    let attributeName = attribute_name;
    return {
      attributeValueId,
      attributeName,
      attributeValue
    };
  }
};

module.exports = ProductSerializer;
