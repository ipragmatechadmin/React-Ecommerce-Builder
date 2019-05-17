/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_detail', {
    item_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    unit_cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'order_detail'
  });
};
