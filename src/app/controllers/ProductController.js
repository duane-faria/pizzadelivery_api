const models = require('../models');
const Yup = require('Yup');

class ProductController {

  async index(req, res) {
    const product = await models.Product.find();
    return res.json(product);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation failed' });
    }

    const product = await models.Product.create(req.body);

    return res.json(product);
  }
}

module.exports = new ProductController();
