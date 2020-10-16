const mongoose = require('mongoose');

const ProductTypeSchema = new mongoose.Schema({
  name: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ProductType', ProductTypeSchema);
