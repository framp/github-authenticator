var Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.OPENSHIFT_POSTGRESQL_DB_DATABASE, 
                     process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME, 
                     process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD, {
  host: process.env.OPENSHIFT_POSTGRESQL_DB_HOST,
  port: process.env.OPENSHIFT_POSTGRESQL_DB_PORT,
  dialect: 'postgres'
}); 
