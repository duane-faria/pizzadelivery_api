const models = require('../models');
class UserController {
  async store(req, res) {
    const user = await models.User.create({
      name: 'Duane',
      email: 'duane@hotmail.com',
      address: 'rua tal',
    });
    return res.json(user);
  }
}
module.exports = new UserController();
