const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    productId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'product_id'
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'product_name'
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'price'
    }
}, {
    timestamps: false 
});

module.exports = Product;
