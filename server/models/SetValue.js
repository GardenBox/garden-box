const uuid = require('uuid').v4;
const moment = require('moment');
const {
  Model,
  DataTypes
} = require('sequelize');
const Plant = require('./Plant');

class SetValue extends Model {}

SetValue.init({
  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  },
  value: {
    type: DataTypes.FLOAT
  },
  createdAt: {
    type: DataTypes.NOW,
    defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss')
  },
}, {
  sequelize,
  modelName: 'setValue',
  updatedAt: false
})

SetValue.beforeCreate(setValue => setValue.id = uuid());
SetValue.belongsTo(Plant, {
  foreignKey: 'id'
});

Plant.hasMany(SetValue, {
  foreignKey: 'id'
});

module.exports = SetValue;
