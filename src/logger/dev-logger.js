const { format, createLogger, transports } = require("winston");
const { printf, combine, timestamp, errors } = format;

const build_dev_logger = () => {
    
    const log_format = printf(({ level, message, timestamp, stack}) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    return createLogger({
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            log_format,
        ),
        transports: [new transports.Console()]
    });

}

module.exports = build_dev_logger;