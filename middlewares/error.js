const { RequestValidationError } = require('../lib/errors')

module.exports = function (err, req, res, next) {
  if (err instanceof RequestValidationError) res.status(200).send(err)
}
