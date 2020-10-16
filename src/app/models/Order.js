const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

module.exports = mongoose.model('Order', OrderSchema);
