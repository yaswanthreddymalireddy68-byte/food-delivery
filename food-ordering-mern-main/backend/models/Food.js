const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);

