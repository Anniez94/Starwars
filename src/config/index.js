const Sequelize = require("sequelize");
const config = require("./config");
require("dotenv/config");

let dev_db = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    dialect: config.development.dialect,
    host: config.development.host,
    logging: false,
    define: {
      freezeTableName: true,
    },
  }
);

let prod_db = new Sequelize(config.production.use_env_variable, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
  define: {
    freezeTableName: true,
  },
});

module.exports = process.env.NODE_ENV === "development" ? dev_db : prod_db;
