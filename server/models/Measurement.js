const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../database');
const Plant = require('./Plant');
const moment = require('moment');
const uuid = require('uuid').v4;
class Measurement extends Model {}

Measurement.init({
  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
  },
  temperature: {
    type: DataTypes.FLOAT
  },
  light: {
    type: DataTypes.FLOAT
  },
  humidity: {
    type: DataTypes.FLOAT
  },
  air: {
    type: DataTypes.FLOAT
  },
  createdAt: {
    type: DataTypes.NOW,
    defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss')
  },
}, {
  sequelize,
  modelName: 'measurement',
  updatedAt: false
})

Measurement.beforeCreate(plant => plant.id = uuid());
Measurement.belongsTo(Plant, {
  foreignKey: 'id'
});

Plant.hasMany(Measurement, {
  foreignKey: 'id'
});

module.exports = Measurement;
