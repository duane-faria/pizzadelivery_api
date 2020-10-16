const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);
