/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('audit', {
    audit_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    code: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'audit'
  });
};
