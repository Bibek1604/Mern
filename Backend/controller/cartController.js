const CartItem = require('../models/Cart');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const item = await CartItem.create({ UserId: req.user.id, ProductId: productId, quantity });
  res.status(201).json(item);
};

exports.getCart = async (req, res) => {
  const items = await CartItem.findAll({ where: { UserId: req.user.id }, include: ['Product'] });
  res.json(items);
};

exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  await CartItem.update({ quantity }, { where: { id: req.params.id, UserId: req.user.id } });
  res.json({ message: 'Updated' });
};

exports.removeCartItem = async (req, res) => {
  await CartItem.destroy({ where: { id: req.params.id, UserId: req.user.id } });
  res.json({ message: 'Removed' });
};