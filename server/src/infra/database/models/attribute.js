/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
   const Attribute = sequelize.define('attribute', {
    attribute_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'attribute',
    timestamps: false
  });
  return Attribute;
};
