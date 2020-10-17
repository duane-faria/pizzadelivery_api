const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  productType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductType',
  },
  productSize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductSize',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);
