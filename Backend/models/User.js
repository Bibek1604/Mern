const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'customer' },
  number: { type: DataTypes.STRING, allowNull: true }, // Phone number
  gender: { type: DataTypes.ENUM('male', 'female', 'other'), allowNull: true },
});

module.exports = User;
