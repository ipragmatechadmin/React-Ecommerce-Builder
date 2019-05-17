/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('review', {
    review_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'review'
  });
};
