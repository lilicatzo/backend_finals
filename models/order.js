const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Order = sequelize.define('Order', {
        orderId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'order_id'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        orderDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'order_date'
        }
    }, {
        timestamps: false
    });

    Order.associate = function(models) {
        Order.hasMany(models.OrderDetails, { foreignKey: 'orderId', as: 'orderDetails' });
    };

    return Order;
};
