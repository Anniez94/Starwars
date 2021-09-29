const Error = require("./api-error-class");
const logger = require("../logger");

const errorHandlerMiddleware = (err, req, res, next) => {

  if (err instanceof Error) {
    logger.error(`REQUEST: "${req.method}"/ URL: "${req.url}"/ MSG: "${err.msg}"/ STATUS: "${err.status}"`);
    return res.status(err.code).json({ msg: err.msg, status: err.status})
 
  }  

};

module.exports = errorHandlerMiddleware;
