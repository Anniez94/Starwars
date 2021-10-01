const Sequelize = require("sequelize");
const config = require("./config");
require("dotenv/config");

let dev_db = new Sequelize(config.development.database, config.development.username, config.development.password, {
  dialect: config.development.dialect,
  host:config.development.host,
  port:config.development.port,
  logging: false, 
  define: {
      freezeTableName: true
    }
});

let prod_db  = new Sequelize(process.env.DATABASE_URL)
// new Sequelize(`postgres://${config.production.username}:${config.production.password}@${config.production.host}/${config.production.database}`)

// new Sequelize(config.production.database, config.production.username, config.production.password, {
//   dialect: config.production.dialect,
//   host:config.production.host,
//   port:config.production.port,
//   logging: false, 
//   define: {
//       freezeTableName: true
//     }
// });

module.exports = process.env.NODE_ENV == "development" ? dev_db : prod_db
