const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Product = require('./Product');

const CartItem = sequelize.define('CartItem', {
  quantity: DataTypes.INTEGER,
});

CartItem.belongsTo(User);
CartItem.belongsTo(Product);

module.exports = CartItem