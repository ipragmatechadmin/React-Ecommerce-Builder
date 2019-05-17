const { attributes } = require('structure');

const Category = attributes({
  category_id: Number,
  name: {
    type: String,
    required: true
  },
  description: String
})(class Category {
});

module.exports = Category;
