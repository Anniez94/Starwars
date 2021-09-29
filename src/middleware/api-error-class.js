class Error {
  constructor(code, msg, status) {
    
    this.code = code;
    this.msg = msg;
    this.status = status;
  }

  static bad_request(msg, status) {
    return new Error(400, msg, status)
  }

  static not_found(msg, status) {
    return new Error(404, msg, status)
  }

  static unauthorized(msg, status) {
    return new Error(401, msg, status)
  }

  static forbidden(msg, status) {
    return new Error(403, msg, status)
  }

  static internal(msg, status) {
    return new Error(500, msg, status)
  }

};

module.exports = Error;