const mongoose = require('mongoose');
const { differenceInMinutes, parseISO } = require('date-fns');
const mongoosePaginate = require('mongoose-paginate'),
  autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const OrderSchema = new mongoose.Schema(
  {
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
    street: {
      type: String,
    },
    number: {
      type: String,
    },
    district: {
      type: String,
    },
    cep: {
      type: String,
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
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

OrderSchema.virtual('time').get(function () {
  function formatOrderDate(date) {
    let diffminutes = differenceInMinutes(
      parseISO(new Date().toISOString()),
      new Date(date)
    );
    if (diffminutes > 1440) {
      let days = Math.round(diffminutes / 60 / 24);
      let end = days > 1 ? ' dias' : ' dia';
      return 'há ' + days + end;
    } else if (diffminutes > 60) {
      let hours = Math.round(diffminutes / 60);
      let end = hours > 1 ? ' horas' : ' hora';
      return 'há ' + hours + end;
    } else {
      return 'há ' + diffminutes + ' minutos';
    }
  }

  let time = formatOrderDate(this.createdAt);
  return time;
});

OrderSchema.plugin(mongoosePaginate);

OrderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'orderNumber',
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model('Order', OrderSchema);
