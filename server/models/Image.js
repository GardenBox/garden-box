const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../database');
const uuid = require('uuid').v4;
const Plant = require('./Plant');

class Image extends Model {}

Image.init({
  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  },
  images: {
    type: DataTypes.JSON
  }
}, {
  sequelize,
  modelName: 'user',
  updatedAt: false,
})

Image.beforeCreate(user => user.id = uuid());
Image.belongsTo(Plant, {
  foreignKey: 'id'
});

Plant.hasMany(Image, {
  foreignKey: 'id'
});
module.exports = Image;
