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

let prod_db  = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
})

// new Sequelize(config.production.database, config.production.username, config.production.password, {
//   dialect: config.production.dialect,
//   ssl: true, 
//   dialectOptions: {
//     ssl: {
//       require: true, // This will help you. But you will see nwe error
//       rejectUnauthorized: false // This line will fix new error
//     }
//   },
//   host:config.production.host,
//   port:config.production.port,
//   logging: false, 
//   define: {
//       freezeTableName: true
//     }
// });
// new Sequelize(process.env.DATABASE_URL)



module.exports =  process.env.NODE_ENV === "development" ? dev_db : prod_db
