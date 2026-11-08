const mongoose = require('mongoose');
const Order = require('../models/Order');
const Food = require('../models/Food');

// @desc   Create a new order (protected)
// @route  POST /api/orders
// @access User
const createOrder = async (req, res) => {
  const { deliveryAddress, phone, items, paymentMethod = 'COD' } = req.body;
  if (!deliveryAddress || !phone || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Missing required order fields' });
  }

  try {
    // Validate each item & calculate subtotal
    let subtotal = 0;
    for (const item of items) {
      const food = await Food.findById(item.food);
      if (!food) return res.status(400).json({ message: `Food item ${item.food} not found` });
      if (!food.available) return res.status(400).json({ message: `Food ${food.name} is not available` });
      const qty = Number(item.quantity);
      if (!qty || qty < 1) return res.status(400).json({ message: 'Invalid quantity' });
      subtotal += food.price * qty;
    }
    const deliveryCharge = subtotal < 500 ? 30 : 0; // simple rule: free delivery over 500
    const totalAmount = subtotal + deliveryCharge;

    const order = await Order.create({
      userId: req.user._id,
      items,
      deliveryAddress,
      phone,
      subtotal,
      deliveryCharge,
      totalAmount,
      paymentMethod,
      orderStatus: 'Pending',
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Get logged‑in user's orders
// @route  GET /api/orders/my-orders
// @access User
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('items.food');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Get all orders (admin)
// @route  GET /api/orders
// @access Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').populate('items.food');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Get order by ID (admin or owner)
// @route  GET /api/orders/:id
// @access Protected
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.food');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // owners can view their own order, admin can view any
    if (req.user.role !== 'admin' && order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Update order status (admin only)
// @route  PUT /api/orders/:id/status
// @access Admin
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const valid = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
  if (!valid.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus };

