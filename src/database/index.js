const mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment');

class Database {
  constructor() {
    this.mongo();
  }

  async mongo() {
    this.mongoConnection = await mongoose.connect(
      'mongodb://localhost/pizzadelivery',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    // autoIncrement.initialize(this.mongoConnection);
  }
}

module.exports = new Database();
