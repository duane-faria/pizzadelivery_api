const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../config/Auth');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!authHeader) {
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
