const models = require('../models');
const Yup = require('Yup');
class ProductController {
  async index(req, res) {

    const orders = await models.Order.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 10,
        populate: [
          {
            path: 'user',
            select: 'name email address',
          },
          {
            path: 'items.product',
            select: 'id name',
          },
          {
            path: 'items.productType',
            select: 'id name',
          },
          {
            path: 'items.productSize',
            select: 'id name',
          },
        ],
        sort: '-createdAt',
      }
    );

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      note: Yup.string().required(),
      price: Yup.number().required(),
      items: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation failed' });
    }

    const { IdUser } = req;
    let { price, note, items } = req.body;

    items = items.map((i) => {
      return { product: i.product, productSize: i.size, productType: i.type };
    });

    const order = await models.Order.create({
      user: IdUser,
      price,
      note,
      items,
    });

    return res.json(order);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deleted = await models.Product.findOneAndDelete({
      _id: id,
    });
    return res.json(deleted);
  }
}

module.exports = new ProductController();
