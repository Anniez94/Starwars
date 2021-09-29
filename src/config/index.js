const Sequelize = require("sequelize");
const config = require("./config");
require("dotenv/config");

let dev_db = new Sequelize(config.development.database, config.development.username, config.development.password, {
  dialect: config.development.dialect,
  host:config.development.host,
  logging: false, 
  define: {
      freezeTableName: true
    }
});

let prod_db = new Sequelize(config.production.database, config.production.username, config.production.password, {
  dialect: config.production.dialect,
  host:config.production.host,
  logging: false, 
  define: {
      freezeTableName: true
    }
});

module.exports = process.env.NODE_ENV == "development" ? dev_db : prod_db
