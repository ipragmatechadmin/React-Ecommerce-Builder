/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Orders = sequelize.define(
    "orders",
    {
      order_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      total_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: "0.00"
      },
      created_on: {
        type: DataTypes.DATE,
        allowNull: false
      },
      shipped_on: {
        type: DataTypes.DATE,
        allowNull: true
      },
      status: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: "0"
      },
      comments: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      customer_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      auth_code: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      reference: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      shipping_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      tax_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      }
    },
    {
      classMethods: {
        placeOrder: function(dbUser, orderData) {
          const updated = sequelize.query(
            "CALL shopping_cart_create_order (:inCartId, :inCustomerId, :inShippingId, :inTaxId);",
            {
              replacements: {
                inCartId: orderData["cartId"],
                inCustomerId: dbUser.customer_id,
                inShippingId: orderData["shippingId"],
                inTaxId: orderData["taxId"]
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return updated;
        },
        updateOrder: function(dbUser, orderData) {
          const updated = sequelize.query(
            "CALL orders_update_order (:inOrderId, :inStatus, :inComments, :inAuthCode, :inReference);",
            {
              replacements: {
                inOrderId: orderData["orderId"],
                inStatus: orderData["status"],
                inComments: orderData["comments"],
                inAuthCode: orderData["authCode"],
                inReference: orderData["reference"]
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return updated;
        }
      },
      tableName: "orders",
      timestamps: false
    }
  );

  return Orders;
};
