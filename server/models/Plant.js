const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../database');
const uuid = require('uuid').v4;

class Plant extends Model {}

Plant.init({
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
  modelName: 'plant',
  updatedAt: false,
})

Plant.beforeCreate(plant => plant.id = uuid());

module.exports = Plant;
