// controllers/orderController.js
const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');

// 📦 Place a new order
exports.placeOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      contactNumber,
      shippingAddress,
      paymentMethod,
      items,
      total,
      userId, // optional
    } = req.body;

    // ✅ Validate required fields
    if (!customerName || !customerEmail || !contactNumber || !shippingAddress || !paymentMethod || !items || !total) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const order = await Order.create({
      orderNumber: `ORD-${uuidv4().split('-')[0]}`, // simple order number
      customerName,
      customerEmail,
      contactNumber,
      shippingAddress,
      paymentMethod,
      items,
      total,
      userId: userId || null,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error('Error placing order:', err.message);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

// 🔍 Get orders for a specific user
exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.query; // use query param

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const orders = await Order.findAll({ where: { userId } });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching user orders:', err.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// 🔐 Get all orders (for admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    console.error('Error fetching all orders:', err.message);
    res.status(500).json({ error: 'Failed to fetch all orders' });
  }
};

// 🔄 Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status || order.status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    console.error('Error updating order:', err.message);
    res.status(500).json({ error: 'Failed to update order' });
  }
};
