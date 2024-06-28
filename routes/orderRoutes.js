const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.placeOrder);
router.get('/user/:userId', orderController.listUserOrders);
router.get('/details/:orderId', orderController.getOrderDetails);

module.exports = router;
