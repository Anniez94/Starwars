const cors = require("cors");

const cors_dev_options = {
    origin: 'http://localhost:9050',
    optionsSuccessStatus: 200
};

const cors_prod_options = {
    origin: 'https://starwars-metacare.netlify.app',
    optionsSuccessStatus: 200
};

process.env.NODE_ENV == 'development' ?  module.exports = cors(cors_dev_options): module.exports = cors();
