const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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
  status: {
    // preparo, entrega, entregue
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Order', OrderSchema);
