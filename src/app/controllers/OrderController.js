const models = require('../models');
const Yup = require('Yup');

class ProductController {
  async index(req, res) {
    const orders = await models.Order.find()
      .populate('user', 'name email address')
      .populate('items', 'product productType productSize ');

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
    const { price, note, items } = req.body;

    const order = await models.Order.create({
      user: IdUser,
      price,
      note,
    });

    let itemsId = [];

    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      let orderItem = await models.OrderItem.create({
        order: item._id,
        product: item.product,
        productType: item.type,
        productSize: item.size,
      });
      itemsId = [...itemsId, orderItem._id];
    }

    let t = await models.Order.findOneAndUpdate(
      { _id: order._id },
      { items: itemsId },
      {
        new: true,
      }
    );
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
