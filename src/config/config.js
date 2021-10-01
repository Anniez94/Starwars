require("dotenv/config");

module.exports = {
  development: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.dbname,
    host: process.env.localhost,
    dialect: "postgres",
  },
  production: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.dbname,
    host: process.env.localhost,
    dialect: "postgres",
  },
};
