var Sequelize = require('sequelize');
var sequelize;

if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

  sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
  });
}

if (process.env.OPENSHIFT_POSTGRESQL_DB_DATABASE){
  sequelize = new Sequelize(
    process.env.OPENSHIFT_POSTGRESQL_DB_DATABASE, 
    process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME, 
    process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD, 
  {
    host: process.env.OPENSHIFT_POSTGRESQL_DB_HOST,
    port: process.env.OPENSHIFT_POSTGRESQL_DB_PORT,
    dialect: 'postgres'
  }); 
}

sequelize.sync();
  
module.exports = sequelize;