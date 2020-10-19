const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  note: {
    type: String,
  },
  price: {
    type: Number,
  },
  items: [
    {
      product: {
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
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
