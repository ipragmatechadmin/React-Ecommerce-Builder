const { attributes } = require('structure');

const Product = attributes({
  product_id: Number,
  name: {
    type: String,
    required: true
  },
  description: String,
  price: String,
  discounted_price: String,
  image: String,
  image_2: String,
  thumbnail: String,
  display: Number
})(class Product {
});

module.exports = Product;
