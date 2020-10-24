const models = require('../models');
const Yup = require('yup');
class UserController {
  async index(req, res) {
    const users = await models.User.find();
    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      address: Yup.string().required(),
    });

    const user = await models.User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({
        error: 'e-mail already registered',
      });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'validation failed, data passed is incomplete or with wrong data types',
      });
    }

    const { id, name, email, address } = await models.User.create(req.body);

    return res.json({ id, name, email, address });
  }
}
module.exports = new UserController();
