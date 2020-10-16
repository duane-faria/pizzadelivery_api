const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  password: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(pass) {
    return bcrypt.compare(pass, this.password);
  },
};

module.exports = mongoose.model('User', UserSchema);
