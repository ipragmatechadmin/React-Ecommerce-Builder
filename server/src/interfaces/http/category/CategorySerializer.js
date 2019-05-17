const CategorySerializer = {
  serialize({ category_id, name, description }) {
    let categoryId = category_id;
    return {
      categoryId,
      name,
      description
    };
  }
};

module.exports = CategorySerializer;
