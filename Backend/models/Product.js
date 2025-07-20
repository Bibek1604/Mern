const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,
  category: DataTypes.STRING,
  image: DataTypes.TEXT, // Changed to TEXT to handle long URLs or base64 data
  rating: DataTypes.FLOAT,
});

module.exports = Product