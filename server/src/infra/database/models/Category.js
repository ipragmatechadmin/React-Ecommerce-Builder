/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define(
    "category",
    {
      category_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      department_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: true
      }
    },
    {
      classMethods: {
        getAllCategoriesByDepartment: function(
          department,
          page,
          limit,
          offset
        ) {
          const categories = sequelize.query(
            "CALL catalog_get_department_categories(:inDepartmentId);",
            {
              replacements: {
                inDepartmentId: department
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return categories;
        }
      },
      tableName: "category",
      timestamps: false
    }
  );

  return Category;
};
