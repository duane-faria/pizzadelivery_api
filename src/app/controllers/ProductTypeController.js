const models = require('../models');
const Yup = require('Yup');

class ProductTypeController {
  async index(req, res) {
    const productTypes = await models.ProductType.find();
    return res.json(productTypes);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation failed' });
    }

    const productType = await models.ProductType.create(req.body);

    return res.json(productType);
  }
}

module.exports = new ProductTypeController();
