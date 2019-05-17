/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const ProductCategory = sequelize.define('product_category', {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'product_category',
    timestamps: false
  });
  return ProductCategory;
};
