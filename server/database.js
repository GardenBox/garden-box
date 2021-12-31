const {
  Sequelize
} = require('sequelize');

const sequelize = new Sequelize('db', 'user', 'pass', {
  dialect: 'sqlite',
  host: './newDB.sqlite'
})

module.exports = sequelize;
