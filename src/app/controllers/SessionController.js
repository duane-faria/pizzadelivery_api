const jwt = require('jsonwebtoken');
const models = require('../models');
const Yup = require('Yup');
const authConfig = require('../config/Auth');
class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation failed' });
    }

    const { email, password } = req.body;

    const user = await models.User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'user not found' });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'password is wrong' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
