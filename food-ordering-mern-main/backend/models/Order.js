const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
      quantity: { type: Number, required: true, min: 1 },
    }
  ],
  deliveryAddress: { type: String, required: true },
  phone: { type: String, required: true },
  subtotal: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['COD'], default: 'COD' },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

