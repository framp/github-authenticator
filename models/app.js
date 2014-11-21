var Sequelize = require('sequelize');
var sequelize = require('../lib/database');

module.exports = sequelize.define('App', {
  name: Sequelize.STRING,
  client_id: {
    type: Sequelize.STRING,
    unique: { name: 'client_id', msg: 'Client Id already registered.' },
    validate: {
      notEmpty: true
    }
  },
  client_secret: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  callback: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
});
