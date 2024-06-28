// controllers/orderController.js
const models = require('../models');
const Order = models.Order;
const OrderDetails = models.OrderDetails;
const Product = models.Product; 

exports.createOrder = async (req, res) => {
    try {
        const { products } = req.body;

        const newOrder = await Order.create({
            userId: req.user.id,
            orderDate: new Date(),
        });

        const orderDetails = await Promise.all(products.map(async (product) => {
            const productDetails = await Product.findByPk(product.productId);
            if (!productDetails) {
                throw new Error(`Product with id ${product.productId} not found`);
            }

            return OrderDetails.create({
                orderId: newOrder.id,
                productId: product.productId,
                quantity: product.quantity,
                priceAtTimeOfOrder: productDetails.price,
            });
        }));

        res.status(201).json({ order: newOrder, orderDetails });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listUserOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [{
                model: OrderDetails,
                as: 'orderDetails',
            }],
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: { id: req.params.orderId, userId: req.user.id },
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found or you do not have permission to view this order.' });
        }

        const orderDetails = await OrderDetails.findAll({
            where: { orderId: req.params.orderId },
        });

        res.json({ order, orderDetails });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
