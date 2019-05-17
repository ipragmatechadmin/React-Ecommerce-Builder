/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const ShoppingCart = sequelize.define(
    "shopping_cart",
    {
      item_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      cart_id: {
        type: DataTypes.CHAR(32),
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      buy_now: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: "1"
      },
      added_on: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      classMethods: {
        addToCart: function(dbUser, cartData) {
          const updated = sequelize.query(
            "CALL shopping_cart_add_product (:inCartId, :inProductId, :inAttributes);",
            {
              replacements: {
                inCartId: cartData["cartId"],
                inProductId: cartData["productId"],
                inAttributes: cartData["attributes"]
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return updated;
        },
        updateCartItem: function(dbUser, cartData) {
          const updated = sequelize.query(
            "CALL shopping_cart_update (:inItemId, :inQuantity);",
            {
              replacements: {
                inItemId: cartData["itemId"],
                inQuantity: cartData["quantity"]
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return updated;
        },
        getCartItems: function(dbUser, cartData) {
          const items = sequelize.query(
            "CALL shopping_cart_get_products (:inCartId);",
            {
              replacements: {
                inCartId: cartData["cartId"],
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return items;
        },

      },
      tableName: "shopping_cart",
      timestamps: false
    }

  );

  return ShoppingCart;
};
