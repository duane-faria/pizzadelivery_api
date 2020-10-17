const models = require('../models');
const Yup = require('Yup');

class ProductSizeController {
  async index(req, res) {
    const sizes = await models.ProductSize.find();
    res.json(sizes);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation failed' });
    }

    const productSize = await models.ProductSize.create(req.body);

    return res.json(productSize);
  }
}

module.exports = new ProductSizeController();
