const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    default: 'C',
  },
  address: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
