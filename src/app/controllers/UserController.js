const models = require('../models');
const Yup = require('yup');
class UserController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        address: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'validation failed' });
      }

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({
          error:
            'validation failed, data passed is incomplete or with wrong data types',
        });
      }

      const { _id, name, email, address } = await models.User.create(req.body);
      return res.json({ _id, name, email, address });
    } catch (e) {
      return res.json({ error: e });
    }
  }
}
module.exports = new UserController();
