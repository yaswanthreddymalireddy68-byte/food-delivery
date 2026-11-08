const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const protect = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.get('/', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;

