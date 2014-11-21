var Sequelize = require('sequelize');
var sequelize = require('../lib/database');

module.exports = sequelize.define('App', {
  name: Sequelize.STRING,
  client_id: Sequelize.STRING,
  client_secret: Sequelize.STRING,
  callback: Sequelize.STRING
});
