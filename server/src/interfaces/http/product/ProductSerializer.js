const ProductSerializer = {
  serialize({ product_id, name, description, price, discounted_price, image, image_2, thumbnail, display }) {
    let productId = product_id;
    let discountedPrice = discounted_price;
    let image2 = image_2;
    return {
      productId,
      name,
      description,
      price,
      discountedPrice,
      image,
      image2,
      thumbnail,
      display
    };
  }
};

module.exports = ProductSerializer;
