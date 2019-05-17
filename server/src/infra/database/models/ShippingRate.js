/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const ShippingRate = sequelize.define('shipping', {
    shipping_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shipping_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    shipping_cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    shipping_region_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'shipping',
    timestamps: false
  });

  return ShippingRate;
};
