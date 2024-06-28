const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const OrderDetails = sequelize.define('OrderDetails', {
        orderDetailsId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'order_details_id'
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'order_id'
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'product_id'
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        priceAtTimeOfOrder: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'price_at_time_of_order'
        }
    }, {
        timestamps: false
    });

    OrderDetails.associate = function(models) {
        OrderDetails.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    };

    return OrderDetails;
};
