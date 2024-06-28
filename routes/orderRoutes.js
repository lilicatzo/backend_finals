const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateJWT } = require('../middleware/auth');


router.post('/', authenticateJWT, orderController.createOrder);
router.get('/user/:userId', authenticateJWT, orderController.listUserOrders);
router.get('/details/:orderId', authenticateJWT, orderController.getOrderDetails);

module.exports = router;
