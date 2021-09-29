const build_dev_logger = require("./dev-logger");
const build_prod_logger = require("./prod-logger");

let logger = null;

process.env.NODE_ENV === 'development' ? logger = build_dev_logger() : logger = build_prod_logger()

module.exports = logger;