require("dotenv/config");

module.exports = {
  development: {
    username: process.env.user,
    password: process.env.password,
    database: process.env.dbname,
    host: process.env.host,
    dialect: "postgres",
  },
  production: {
    username: process.env.user,
    password: process.env.password,
    database: process.env.dbname,
    host: process.env.host,
    dialect: "postgres",
  },
};
