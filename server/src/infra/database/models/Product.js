/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define(
    "product",
    {
      product_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      discounted_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: "0.00"
      },
      image: {
        type: DataTypes.STRING(150),
        allowNull: true
      },
      image_2: {
        type: DataTypes.STRING(150),
        allowNull: true
      },
      thumbnail: {
        type: DataTypes.STRING(150),
        allowNull: true
      },
      display: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
        defaultValue: "0"
      }
    },
    {
      classMethods: {
        getAllProductsByText: function(searchText, page, limit, offset) {
          const products = sequelize.query(
            "CALL catalog_search(:inSearchString, :inAllWords, :inShortProductDescriptionLength, :inProductsPerPage, :inStartItem);",
            {
              replacements: {
                inSearchString: searchText,
                inAllWords: "on",
                inShortProductDescriptionLength: 50,
                inProductsPerPage: limit,
                inStartItem: offset
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return products;
        },
        getAllProductsCountByText: function(searchText) {
          const count = sequelize.query(
            "CALL catalog_count_search_result(:inSearchString, :inAllWords);",
            {
              replacements: {
                inSearchString: searchText,
                inAllWords: "on"
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return count;
        },
        getAllProductsByCategory: function(category, page, limit, offset) {
          const products = sequelize.query(
            "CALL catalog_get_products_in_category(:inCategoryId, :inShortProductDescriptionLength, :inProductsPerPage, :inStartItem);",
            {
              replacements: {
                inCategoryId: category,
                inShortProductDescriptionLength: 50,
                inProductsPerPage: limit,
                inStartItem: offset
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return products;
        },
        getAllProductsCountByCategory: function(category) {
          const count = sequelize.query(
            "CALL catalog_count_products_in_category(:inCategoryId);",
            {
              replacements: {
                inCategoryId: category
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return count;
        },
        getAttributes: function(productId) {
          const productAttributes = sequelize.query(
            "CALL catalog_get_product_attributes(:inProductId);",
            {
              replacements: {
                inProductId: productId
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return productAttributes;
        }
      },
      tableName: "product",
      timestamps: false
    }
  );

  return Product;
};
