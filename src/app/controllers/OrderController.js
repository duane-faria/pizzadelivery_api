const models = require('../models');
const Yup = require('Yup');
class OrderController {
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
    let {
      price,
      note,
      items,
      status,
      street,
      number,
      district,
      cep,
    } = req.body;

    items = items.map((i) => {
      return { product: i.product, productSize: i.size, productType: i.type };
    });

    const order = await models.Order.create({
      user: IdUser,
      price,
      note,
      items,
      status,
      street,
      number,
      district,
      cep,
    });

    req.app.get('socketService').emiter('message', order);

    return res.json(order);
  }

  async update(req, res) {
    const { id } = req.params;

    if (!Object.keys(req.body).length) {
      return res.json({ error: 'no data has been passed' });
    }

    await models.Order.update({ _id: id }, req.body);
    const order = await models.Order.findOne({ _id: id });
    return res.json(order);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deleted = await models.Order.findOneAndDelete({
      _id: id,
    });
    return res.json(deleted);
  }

  async getUserOrders(req, res) {
    const { userId } = req.params;
    const orders = await models.Order.paginate(
      { user: userId },
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
}

module.exports = new OrderController();
