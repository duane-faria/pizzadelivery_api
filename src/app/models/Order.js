const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate'),
  autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection); // This is important. You can remove initialization in different file

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
    // pedido, preparo, entrega, entregue
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.plugin(mongoosePaginate);
OrderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'orderNumber',
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model('Order', OrderSchema);
