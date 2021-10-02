require("dotenv/config");

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql"
  },
  production: {
    dialect: "postgres",
    port: process.env.port,
    use_env_variable: "DATABASE_URL",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  },
};
