require("dotenv/config");

module.exports = {
  development: {
    username: process.env.user,
    password: process.env.password,
    database: process.env.dbname,
    host: process.env.host,
    dialect: "postgres",
    port: process.env.port
  },
  production: {
    username: process.env.user,
    password: process.env.password,
    database: process.env.dbname,
    host: process.env.host,
    dialect: "postgres",
    port: process.env.port
  },
};
