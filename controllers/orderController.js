// controllers/orderController.js
const models = require('../models');
const Order = models.Order;
const OrderDetails = models.OrderDetails;


exports.placeOrder = async (req, res) => {
    const { userId, products } = req.body;
    try {
        const order = await Order.create({ userId });
        console.log('Order created:', order);

        const orderItems = products.map(product => ({
            orderId: order.orderId,
            productId: product.productId,
            quantity: product.quantity,
            priceAtTimeOfOrder: product.price
        }));
        
        console.log('Order items to be created:', orderItems);

        const createdOrderItems = await OrderDetails.bulkCreate(orderItems);
        console.log('Order items created:', createdOrderItems);

        res.status(201).json(order);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: error.message });
    }
};


exports.listUserOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.params.userId },
            include: [
                {
                    model: OrderDetails,
                    as: 'orderDetails'
                }
            ]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetails.findAll({
            where: { orderId: req.params.orderId }
        });
        res.json(orderDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


