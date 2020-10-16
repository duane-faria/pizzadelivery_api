const mongoose = require('mongoose');

const ProductSizeSchema = new mongoose.Schema({
  name: String,
  basePrice: Number,
});

module.exports = mongoose.model('ProductSize', ProductSizeSchema);
