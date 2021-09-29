const { format, createLogger, transports } = require("winston");
const { combine, timestamp, errors, json } = format;

const build_prod_logger = () => {

    return createLogger({
        format: combine(
            timestamp(),
            errors({ stack: true }),
            json()
        ),
        defaultMeta: { service: 'user-service' },
        transports: [
            new transports.File({filename: './src/logger/logs/info.log', level: 'info'}),
            new transports.File({filename: './src/logger/logs/error.log', level: 'error'})
        ],
    });

}

module.exports = build_prod_logger;