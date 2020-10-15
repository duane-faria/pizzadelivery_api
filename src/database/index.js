const mongoose = require('mongoose');

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost/pizzadelivery',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    ).then(() => console.log('mongodb successfully connected'));
  }
}

module.exports = new Database();
