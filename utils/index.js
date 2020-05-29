// #region @hapi/joi
exports.validateJoiSchema = (schema, inputs) => {
  const { error } = schema.validate(inputs, { abortEarly: false })

  return error
    ? {
        isValidated: false,
        errors: error.details.reduce((acc, cur) => {
          acc[cur.path[0]] = cur.type
          return acc
        }, {})
      }
    : { isValidated: true }
}

exports.wrapJoiSchema = schema => inputs =>
  exports.validateJoiSchema(schema, inputs)
// #endregion

exports.regex = {
  date: /^20[0-9]{2}-[0-9]{2}-[0-9]{2}$/
}

exports.successfullResponse = data => ({ code: 0, msg: 'Success', ...data })
