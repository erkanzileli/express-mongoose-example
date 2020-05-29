class RequestValidationError extends Error {
  constructor(errors) {
    super()
    this.msg = errors
    this.code = 400
  }
}

module.exports = { RequestValidationError }
