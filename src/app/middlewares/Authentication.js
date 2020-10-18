const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../config/Auth');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      error: 'Token not provided',
    });
  }

  const [, token] = auth.split(' ');

  try {
    const { id } = await promisify(jwt.verify)(token, authConfig.secret);
    req.IdUser = id;
    return next();
  } catch (e) {
    return res.status(401).json({
      error: 'Token invalid',
    });
  }
};
