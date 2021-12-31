const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../database');
const uuid = require('uuid').v4;
const Plant = require('./Plant');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  images: {
    type: DataTypes.JSON
  }
}, {
  sequelize,
  modelName: 'user',
  updatedAt: false,
  createdAt: false
})

User.beforeCreate(user => user.id = uuid());
User.belongsTo(Plant);

module.exports = User;
